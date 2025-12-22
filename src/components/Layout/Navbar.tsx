"use client";
import React, { useContext, useState } from "react";
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Loader2 } from "lucide-react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { cartContext } from "@/Contexts/cartContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);

  const pathName = usePathname();

  const navItem = [
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
    { href: "/brands", label: "Brands" },
  ];


    const { cartCount , isLoading } = useContext(cartContext)
  


  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-sm">
        {/* <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <span>Free shipping on orders over $50</span>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gray-300">
              Help
            </Link>
            <Link href="#" className="hover:text-gray-300">
              Track Order
            </Link>
          </div>
        </div> */}
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="text-2xl font-bold text-black">
              Shop
            </Link>
          </div>

          {/* Desktop Navigation */}
          {/* <div className="hidden md:flex items-center space-x-8">
            <Link
            
              className="hover:text-blue-600 font-medium  "
              href={"products"}
            >
              products
            </Link>

            <Link
              className="hover:text-blue-600 font-medium "
              href={"categories"}
            >
              categories
            </Link>

            <Link className="hover:text-blue-600 font-medium " href={"brands"}>
              brands
            </Link>
          </div> */}
          <NavigationMenu className="hidden lg:flex ">
            <NavigationMenuList className="flex">
              {navItem.map((item) => {
                const isActive = pathName.startsWith(item.href);
                return (
                  <NavigationMenuItem key={item.href} className=" ">
                    <Link href={item.href}>
                      <NavigationMenuLink
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-md font-semibold"
                            : "bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                      >
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar */}
          {/* <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div> */}

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600">
              <User className="w-6 h-6" />
            </button>
            <Link href={"/cart"} className="text-gray-700 hover:text-blue-600 relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                { isLoading ? <Loader2 className="animate-spin"/> : cartCount}
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute w-full border-t bg-background">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {navItem.map((item) => {
                const isActive = pathName.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="pt-4 border-t border-gray-200 flex items-center gap-4">
            <button className="flex items-center gap-2 text-gray-700">
              <User className="w-5 h-5" />
              Account
            </button>

            <Link href={"/cart"} className="flex items-center gap-2 text-gray-700 relative">
                <ShoppingCart className="w-5 h-5" />
             
              Cart
              
            </Link >
          </div>
        </div>
      )}
    </nav>
  );
}
