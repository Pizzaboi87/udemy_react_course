import { initializeApp } from 'firebase/app'
import { Category } from '../../store/categories/category.types';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    NextOrObserver
} from 'firebase/auth'
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot
 } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCD5P0L7cBzpzdSe2rf8Z23IQ37L0UFfvQ",
    authDomain: "udemy-course-db-1bd3c.firebaseapp.com",
    projectId: "udemy-course-db-1bd3c",
    storageBucket: "udemy-course-db-1bd3c.appspot.com",
    messagingSenderId: "423227788621",
    appId: "1:423227788621:web:72cb9a50bff920afb87b04"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig)

  const googleProvider = new GoogleAuthProvider()

  googleProvider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth()
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

  export const db = getFirestore()

  export type ObjectToAdd = {
    title: string
  }

  export const addCollectionAndDocuments = async <T extends ObjectToAdd> (
    collectionKey: string, 
    objectsToAdd: T[],
  ): Promise<void> => {
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db)

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase())
      batch.set(docRef, object)
    })

    await batch.commit()
    console.log('done')
  }

  export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(
      (docSnapshot) => docSnapshot.data() as Category)
  }

  export type AdditionalInformation = {
    displayName?: string;
  }

  export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
  }

  export const createUserDocumentFromAuth = async (
    userAuth: User, 
    additionalInformation = {} as AdditionalInformation
  ): Promise<void | QueryDocumentSnapshot<UserData>> => {
    if(!userAuth) return
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapShot = await getDoc(userDocRef)

    if(!userSnapShot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('error during create the user', error)
        }
    }

    return userSnapShot as QueryDocumentSnapshot<UserData>
  }

  export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
  }

  export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
  }

  export const signOutUser = async () => await signOut(auth)

  export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback)

  export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (userAuth) => {
          unsubscribe()
          resolve(userAuth)
        },
        reject
      )
    })
  }