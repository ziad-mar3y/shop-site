import { Button } from "../ui";
import { Loader2, ShoppingCart } from "lucide-react";

interface AddToCartButonProps {
  productQuantity: number;
  addTocartLoading: boolean;
  handleAddToCart: () => void;
}

export default function AddToCartButon({
  productQuantity,
  addTocartLoading,
  handleAddToCart,
}: AddToCartButonProps) {
  return (
    <div><Button
      size="lg"
      className="flex-1 w-full"
      disabled={productQuantity === 0 || addTocartLoading}
      onClick={handleAddToCart}
    >
      {addTocartLoading && <Loader2 className="animate-spin" />}
      <ShoppingCart className="h-5 w-5 mr-2" />
      Add to Cart
    </Button></div>
  );
}

// handleAddToCart
