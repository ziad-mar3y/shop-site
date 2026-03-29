import { apiServices } from "@/apiServices/apiServices";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import InnerCart from "./InnerCart";

export default async function ShopingCart() {
  const session = await getServerSession(authOptions);
  if (!session?.token) {
    redirect("/auth/login");
  }
  const token = session.token;

  async function fetchCart() {
    try {
      const response = await apiServices.getUserCart(token);
      console.log(response);
      
      return response;
    } catch (error) {
      console.error('Error fetching cart:', error);
      // Return empty cart structure on error to prevent page crash
      return {
        status: "fail",
        message: "Error fetching cart",
        numOfCartItems: 0,
        cartId: '',
        data: {
          _id: '',
          cartOwner: '',
          products: [],
          createdAt: '',
          updatedAt: '',
          __v: 0,
          totalCartPrice: 0
        }
      };
    }
  }

  const response = await fetchCart();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8 px-4">
      <InnerCart key={response.cartId} cartData={response} />
    </div>
  );
}
