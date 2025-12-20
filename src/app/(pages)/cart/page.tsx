import { apiServices } from "@/apiServices/apiServices";
import InnerCart from "./InnerCart";


export default async function ShopingCart() {
  async function fetchCart() {
    const response = await apiServices.getUserCart();
    return response;
  }

  const response = await fetchCart();

  // response.data.products[0].product.

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8 px-4">
      <InnerCart key={response.cartId} cartData={response} />
    </div>
  );
}
