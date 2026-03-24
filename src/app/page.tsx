"use client";
import { Button } from "@/components/ui/button";
import { decrement, increment} from "@/redux/slices/CounterSlice";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import HeroCarousel from "@/components/HeroCarousel";

export default function Home() {
  // const { count } = useSelector((state: RootState) => state.counter);
  // const dispatch = useDispatch()

  return (
    <div>
     
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Why Shop With Us?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the latest technology, fashion, and lifestyle products.
            Quality guaranteed with fast shipping and excellent customer service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              <Link href={"/products"}>Shop Now</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              <Link href={"/categories"}>Browse Categories</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
