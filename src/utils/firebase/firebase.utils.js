import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth'
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc
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

  const provider = new GoogleAuthProvider()

  provider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth()
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

  export const db = getFirestore()

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapShot = await getDoc(userDocRef)

    if(!userSnapShot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('error during create the user', error.message)
        }
    }

    return userDocRef
  }