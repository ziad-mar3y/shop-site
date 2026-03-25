export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface CashOnDeliveryRequest {
  shippingAddress: ShippingAddress;
}

export interface CashOnDeliveryResponse {
  status: 'success' | 'error';
  message?: string;
  data?: Order;
}

export interface Address {
  _id: string;
  details: string;
  phone: string;
  city: string;
  name?: string;
}

export interface AddressResponse {
  success: boolean;
  data: Address[];
  message?: string;
}

export interface Order {
  _id: string;
  id: number;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  cartItems: Array<{
    _id: string;
    count: number;
    price: number;
    product: {
      _id: string;
      id: string;
      title: string;
      imageCover?: string;
      category: {
        _id: string;
        name: string;
        slug: string;
        image?: string;
      };
      brand: {
        _id: string;
        name: string;
        slug: string;
        image?: string;
      };
      subcategory: Array<{
        _id: string;
        name: string;
        slug: string;
        category: string;
      }>;
      ratingsAverage: number;
      ratingsQuantity: number;
    };
  }>;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: 'cash' | string;
  isPaid: boolean;
  isDelivered: boolean;
  status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  shippingAddress?: ShippingAddress;
}
