export interface ShippingAddress {
  _id?: string;
  name: string;
  details: string;
  city: string;
  phone: string;
}

export interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  products: Array<{
    _id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  status: string;
  shippingAddress?: ShippingAddress;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderResponse {
  success: boolean;
  data: Order[];
  message?: string;
}

export interface CashOnDeliveryRequest {
  cartOrderId: string;
  shippingAddress: ShippingAddress;
}

export interface CashOnDeliveryResponse {
  success: boolean;
  message: string;
  data?: Order;
}
