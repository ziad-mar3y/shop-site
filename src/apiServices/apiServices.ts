import {
  addToCartResponse,
  getCartResponse,
  handleCartCount,
  RemoveProductCart,
} from "@/interfaces";
import {
  BrandResponse,
  CategoryResponse,
  ProductResponse,
  SingleBrandResponse,
  SingleCategoryResponse,
  SingleProductResponse,
} from "@/types";
import { Address } from "cluster";

// token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NDA1MzQ5NGEwYzBmMjZhNzM4Yjk5YiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY1ODIzMzA2LCJleHAiOjE3NzM1OTkzMDZ9.pe0ULr-nVg5GRyFGa5qhsXHQpBniTiYKnl1LfYXGnLk";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

class ApiServices {
  baseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL!;

  async getAllProducts(): Promise<ProductResponse> {
    return await fetch(this.baseUrl + "api/v1/products/", {
      next: {
        revalidate: 5,
      },
      cache: "force-cache",
    }).then((res) => res.json());
  }

  async getProductDetails(id: string): Promise<SingleProductResponse> {
    return await fetch(this.baseUrl + "api/v1/products/" + id).then((res) =>
      res.json(),
    );
  }

  async getAllCategories(): Promise<CategoryResponse> {
    return await fetch(this.baseUrl + "api/v1/categories").then((res) =>
      res.json(),
    );
  }

  async getSingleCategory(id: string): Promise<SingleCategoryResponse> {
    return await fetch(this.baseUrl + "api/v1/categories/" + id).then((res) =>
      res.json(),
    );
  }

  async getAllBrands(): Promise<BrandResponse> {
    return await fetch(this.baseUrl + "api/v1/brands").then((res) =>
      res.json(),
    );
  }

  async getSingleBrand(id: string): Promise<SingleBrandResponse> {
    return await fetch(this.baseUrl + "api/v1/brands/" + id).then((res) =>
      res.json(),
    );
  }

  handlHeadrs(token?: string | null) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
     
      };
    if (token) {
      headers.token = token;
    }
    return headers;
  }

  async addProductToCart(productId: string, token?: string | null): Promise<addToCartResponse> {
    return fetch(this.baseUrl + "api/v1/cart", {
      method: "post",
      body: JSON.stringify({
        productId,
      }),
      headers: this.handlHeadrs(token),
    }).then((res) => res.json());
  }

  async getUserCart(token?: string | null): Promise<getCartResponse> {
    const response = await fetch(this.baseUrl + "api/v1/cart", {
      headers: this.handlHeadrs(token),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON");
    }
    
    return response.json();
  }

  async removeSingleProduct(productId: string, token?: string | null): Promise<RemoveProductCart> {
    const response = await fetch(this.baseUrl + "api/v1/cart/" + productId, {
      method: "delete",
      headers: this.handlHeadrs(token),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON");
    }
    
    return response.json();
  }

  async clearCart(token?: string | null): Promise<RemoveProductCart> {
    const response = await fetch(this.baseUrl + "api/v1/cart", {
      method: "delete",
      headers: this.handlHeadrs(token),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON");
    }
    
    return response.json();
  }

  async updateCartProductCount(
    productId: string,
    count: number,
    token?: string | null,
  ): Promise<handleCartCount> {
    const response = await fetch(this.baseUrl + "api/v1/cart/" + productId, {
      method: "put",
      body: JSON.stringify({
        count,
      }),
      headers: this.handlHeadrs(token),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON");
    }
    
    return response.json();
  }

  async checkOut(cartId: string, token?: string | null) {
    return fetch(
      this.baseUrl +
        "api/v1/orders/checkout-session/" +
        cartId +
        "?url=http://localhost:3000/orders",
      {
        body: JSON.stringify({
          shippingAddress: {
            details: "details",
            phone: "01010700999",
            city: "Cairo",
          },
        }),
        headers: this.handlHeadrs(token),
        method: "post",
      },
    ).then((res) => res.json());
  }

  async login(email: string, password: string) {
    return await fetch(baseUrl + "api/v1/auth/signin", {
      body: JSON.stringify({
        email,
        password,
      }),
      headers: this.handlHeadrs(),
      method: "post",
    }).then((res) => res.json());
  }

  async register(name: string, email: string, password: string, rePassword:string , phone: string) {
    return await fetch(baseUrl + "api/v1/auth/signup", {
      body: JSON.stringify({
        name,
        email,
        password,
        rePassword,
        phone
      }),
      headers: this.handlHeadrs(),
      method: "post",
    }).then((res) => res.json());
  }
  
  async getAllSubcategories() {
    return await fetch(baseUrl + "api/v1/subcategories", {
      headers: this.handlHeadrs(),
    }).then((res) => res.json());
  }
  async addAddress(name:string, details:string, phone:string, city:string, token?: string) {
    return await fetch(baseUrl + "api/v1/addresses", {
      body: JSON.stringify({
        name,
        details,
        phone,
        city
      }),
      headers: this.handlHeadrs(token),
      method: "post",
    }).then((res) => res.json());
  }
  
  async getAddresses(token?: string) {
    return await fetch(baseUrl + "api/v1/addresses", {
      headers: this.handlHeadrs(token),
      method: "get",
    }).then((res) => res.json());
  }
  
  async deleteAddress(id: string, token?: string) {
    return await fetch(baseUrl + "api/v1/addresses/" + id, {
      headers: this.handlHeadrs(token),
      method: "delete",
    }).then((res) => res.json());
  }

  // -------------------------
  // WISHLIST METHODS
  // -------------------------
  
  async getWishlist(token?: string) {
    const response = await fetch(baseUrl + "api/v1/wishlist", {
      headers: this.handlHeadrs(token),
      method: "get",
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON");
    }
    
    return response.json();
  }

  async addToWishlist(productId: string, token?: string) {
    const response = await fetch(baseUrl + "api/v1/wishlist", {
      body: JSON.stringify({ productId }),
      headers: this.handlHeadrs(token),
      method: "post",
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON");
    }
    
    return response.json();
  }

  async removeFromWishlist(productId: string, token?: string) {
    const response = await fetch(baseUrl + "api/v1/wishlist/" + productId, {
      headers: this.handlHeadrs(token),
      method: "delete",
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON");
    }
    
    return response.json();
  }

  // -------------------------
  // USER PROFILE METHODS
  // -------------------------
  
  async changePassword(currentPassword: string, password: string, rePassword: string, token?: string) {
    return await fetch(baseUrl + "api/v1/users/changeMyPassword", {
      body: JSON.stringify({
        currentPassword,
        password,
        rePassword
      }),
      headers: this.handlHeadrs(token),
      method: "put",
    }).then((res) => res.json());
  }

  async updateProfile(name: string, email: string, phone: string, token?: string) {
    return await fetch(baseUrl + "api/v1/users/updateMe/", {
      body: JSON.stringify({
        name,
        email,
        phone
      }),
      headers: this.handlHeadrs(token),
      method: "put",
    }).then((res) => res.json());
  }

  // -------------------------
  // ORDER METHODS
  // -------------------------

  async getOrders(token?: string): Promise<any> {
    return await fetch(baseUrl + "api/v1/orders", {
      headers: this.handlHeadrs(token),
      method: "get",
    }).then((res) => res.json());
  }

  async cashOnDelivery(cartOrderId: string, shippingAddress: any, token?: string): Promise<any> {
    try {
      console.log('Making cash on delivery request:', {
        url: baseUrl + "api/v1/orders/" + cartOrderId,
        method: "POST",
        body: { shippingAddress },
        token: token ? 'present' : 'missing'
      });

      const response = await fetch(baseUrl + "api/v1/orders/" + cartOrderId, {
        body: JSON.stringify({
          shippingAddress
        }),
        headers: this.handlHeadrs(token),
        method: "post",
      });
      
      console.log('HTTP Response status:', response.status);
      console.log('HTTP Response headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const responseData = await response.json();
      console.log('Parsed API response:', responseData);
      return responseData;
    } catch (error) {
      console.error('Cash on delivery API error:', error);
      throw error;
    }
  }

  async getUserOrders(userId: string, token?: string): Promise<any> {
    try {
      console.log('Getting user orders for userId:', userId);
      
      // The endpoint that works is /api/v1/orders (without user parameter)
      // since the user is authenticated via token, we don't need the user ID
      console.log('API URL:', baseUrl + "api/v1/orders");
      
      const response = await fetch(baseUrl + "api/v1/orders", {
        headers: this.handlHeadrs(token),
        method: "get",
      });
      
      console.log('User orders response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('User orders fetch error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const responseData = await response.json();
      console.log('User orders response data:', responseData);
      return responseData;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      
      // Handle specific MongoDB connection error
      if (error instanceof Error && error.message.includes('connection') && error.message.includes('mongodb')) {
        return {
          status: 'error',
          message: 'Database connection error. Please try again later.',
          data: null
        };
      }
      
      // Handle other errors
      return {
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to fetch user orders',
        data: null
      };
    }
  }

  async getOrderById(orderId: string, token?: string): Promise<any> {
    try {
      console.log('Getting order by ID:', orderId);
      console.log('API URL:', baseUrl + "api/v1/orders/" + orderId);
      
      const response = await fetch(baseUrl + "api/v1/orders/" + orderId, {
        headers: this.handlHeadrs(token),
        method: "get",
      });
      
      console.log('Order response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Order fetch error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const responseData = await response.json();
      console.log('Order response data:', responseData);
      return responseData;
    } catch (error) {
      console.error('Error fetching order by ID:', error);
      throw error;
    }
  }

  async getUserAddresses(token?: string): Promise<any> {
    return await fetch(baseUrl + "api/v1/addresses", {
      headers: this.handlHeadrs(token),
      method: "get",
    }).then((res) => res.json());
  }
}

export const apiServices = new ApiServices();
