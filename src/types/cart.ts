export interface CartProductItem<T> {
    count: number;
    _id: string;
    product: T;
    price: number;
}

export interface CartData<T> {
    _id: string;
    cartOwner: string;
    products: CartProductItem<T>[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalCartPrice: number;
}

export interface CartResponse {
    status: string;
    message: string;
    numOfCartItems: number;
    cartId: string;
    data: CartData<any>;
}

export interface AddToCartResponse {
    status: string;
    message: string;
    numOfCartItems: number;
    cartId: string;
    data: CartData<string>;
}

export interface CartCountResponse {
    status: string;
    message: string;
    numOfCartItems: number;
    cartId: string;
    data: CartData<any>;
}
