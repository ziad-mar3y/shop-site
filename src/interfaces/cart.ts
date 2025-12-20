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


export interface RemoveProductCart {
  status: string
  numOfCartItems: number
  cartId: string
  data: Data
}

export interface Data {
  _id: string
  cartOwner: string
  products: ProductCart[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface ProductCart {
  count: number
  _id: string
  product: Product3
  price: number
}

export interface Product3 {
  subcategory: Subcategory3[]
  _id: string
  title: string
  quantity: number
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  id: string
}

export interface Subcategory3 {
  _id: string
  name: string
  slug: string
  category: string
}

export interface Category3 {
  _id: string
  name: string
  slug: string
  image: string
}

export interface Brand3 {
  _id: string
  name: string
  slug: string
  image: string
}
