import { Product } from "@/interfaces";
import {
  BrandResponse,
  CategoryResponse,
  ProductResponse,
  SingleProductResponse,
} from "@/types";

class ApiServices {
  async getAllProducts(): Promise<ProductResponse> {
    return await fetch("https://ecommerce.routemisr.com/api/v1/products").then(
      (res) => res.json()
    );
  }

  async getProductDetails(id: string): Promise<SingleProductResponse> {
    return await fetch(
      "https://ecommerce.routemisr.com/api/v1/products/" + id
    ).then((res) => res.json());
  }

  async getAllCategories(): Promise<CategoryResponse> {
    return await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories"
    ).then((res) => res.json());
  }

  async getAllBrands(): Promise<BrandResponse> {
    return await fetch("https://ecommerce.routemisr.com/api/v1/brands").then(
      (res) => res.json()
    );
  }
}

export const apiServices = new ApiServices();
