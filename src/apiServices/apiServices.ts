import {
  addToCartResponse,
  getCartResponse,
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
import { json } from "stream/consumers";

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
    return await fetch(
      this.baseUrl + "api/v1/products/" + id
    ).then((res) => res.json());
  }

  async getAllCategories(): Promise<CategoryResponse> {
    return await fetch(
      this.baseUrl + "api/v1/categories"
    ).then((res) => res.json());
  }

  async getSingleCategory(id: string): Promise<SingleCategoryResponse> {
    return await fetch(
      this.baseUrl + "api/v1/categories/" + id
    ).then((res) => res.json());
  }

  async getAllBrands(): Promise<BrandResponse> {
    return await fetch(this.baseUrl + "api/v1/brands").then(
      (res) => res.json()
    );
  }

  async getSingleBrand(id: string): Promise<SingleBrandResponse> {
    return await fetch(
      this.baseUrl + "api/v1/brands/" + id
    ).then((res) => res.json());
  }

  handlHeadrs() {
    return {
      "Content-Type": "application/json",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NDA1MzQ5NGEwYzBmMjZhNzM4Yjk5YiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY2NDMxNTY4LCJleHAiOjE3NzQyMDc1Njh9.qLkJWGsEZJU0jvjPw-WX5Q5zrIpzQPfE_Mu90wrDMAY",
    };
  }

  async addProductToCart(productId: string): Promise<addToCartResponse> {
    return fetch(this.baseUrl + "api/v1/cart", {
      method: "post",
      body: JSON.stringify({
        productId,
      }),
      headers: this.handlHeadrs(),
    }).then((res) => res.json());
  }

  async getUserCart(): Promise<getCartResponse> {
    return fetch(this.baseUrl + "api/v1/cart", {
      headers: this.handlHeadrs(),
    }).then((res) => res.json());
  }

  async removeSingleProduct(productId: string): Promise<RemoveProductCart> {
    return await fetch(
      this.baseUrl + "api/v1/cart/" + productId,
      {
        method: "delete",
        headers: this.handlHeadrs(),
      }
    ).then((res) => res.json());
  }

  async clearCart(): Promise<RemoveProductCart> {
    return await fetch(this.baseUrl + "api/v1/cart", {
      method: "delete",
      headers: this.handlHeadrs(),
    }).then((res) => res.json());
  }

  async updateCartProductCount(productId: string, count: number): Promise<any> {
    return await fetch(this.baseUrl + "api/v1/cart/" + productId, {
      method: "put",
      body: JSON.stringify({
        count,
      }),
      headers: this.handlHeadrs(),
    }).then((res) => res.json());
  }
}

export const apiServices = new ApiServices();
