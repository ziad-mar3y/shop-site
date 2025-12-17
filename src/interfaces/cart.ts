import { Brand } from "./brand"
import { Category, SubCategory } from "./category"

export interface addToCartResponse {
  status: string
  message: string
  numOfCartItems: number
  cartId: string
  data: CartResponseData<string>
}
export interface getCartResponse {
  status: string
  message: string
  numOfCartItems: number
  cartId: string
  data: CartResponseData<Product2>
}

 export interface CartResponseData<T> {
  _id: string
  cartOwner: string
  products: CartProduct<T>[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

 export interface CartProduct<T> {
  count: number
  _id: string
  product: T
  price: number
}

export interface Product2 {
  subcategory: SubCategory[]
  _id: string
  title: string
  quantity: number
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  id: string
}
