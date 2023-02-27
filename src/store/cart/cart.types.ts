import { CategoryItem } from '../categories/category.types'

export enum CART_ACTION_TYPES {
  SET_IS_CART_OPEN = 'cart/SET_IS_CART_OPEN',
  SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
  SET_CART_COUNT = 'cart/SET_CART_COUNT',
  SET_CART_TOTAL = 'cart/SET_CART_TOTAL',
  CLEAR_CART = 'cart/CLEAR_CART'
};

export type CartItem = CategoryItem & {
  quantity: number;
}