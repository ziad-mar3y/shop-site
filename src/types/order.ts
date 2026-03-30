export interface OrderData {
    _id: string;
    user: string;
    cartItems: any[];
    totalOrderPrice: number;
    shippingAddress: {
        details: string;
        phone: string;
        city: string;
    };
    paymentMethodType: string;
    isPaid: boolean;
    isDelivered: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface CashOnDeliveryData {
    shippingAddress: {
        details: string;
        phone: string;
        city: string;
    };
}
