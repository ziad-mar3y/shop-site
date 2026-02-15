import { apiServices } from "@/apiServices/apiServices";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import InnerCart from "./InnerCart";

export default async function ShopingCart() {
  const session = await getServerSession(authOptions);
  const token = session?.token ?? null;

  async function fetchCart() {
    const response = await apiServices.getUserCart(token);
    return response;
  }

  const response = await fetchCart();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8 px-4">
      <InnerCart key={response.cartId} cartData={response} />
    </div>
  );
}
