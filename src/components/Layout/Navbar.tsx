"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu, X, Loader2, LogOut, Heart } from "lucide-react";
import { Button } from "@/components";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components";
import { cn } from "@/lib/utils";
import React, { useContext, useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { cartContext } from "@/Contexts/cartContext";
import { useWishlistContext } from "@/Contexts/wishlistContext";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount, isLoading } = useContext(cartContext);
  const { wishlistCount } = useWishlistContext();
  const { data, status } = useSession(); 
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]); 
  
  const navItems = [
    { href: "/products", label: "Products" },
    { href: "/brands", label: "Brands" },
    { href: "/categories", label: "Categories" },
    { href: "/orders", label: "Orders" },
  ];



  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-all duration-300",
      isScrolled && "bg-background/98 shadow-lg"
    )}>
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="h-7 w-7 sm:h-8 sm:w-8 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-primary-foreground font-bold text-sm sm:text-lg">
                T
              </span>
            </div>
            <span className="font-bold text-lg sm:text-xl text-foreground">TechMart</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <NavigationMenuItem key={item.href}>
                    <Link href={item.href}>
                      <NavigationMenuLink
                        className={cn(
                          "group inline-flex h-9 sm:h-10 w-max items-center justify-center rounded-md px-3 sm:px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
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
          {/* Action Buttons */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* User Account */}
            {status == "loading" ? (<Loader2 className="animate-spin h-4 w-4 sm:h-5 sm:w-5" />
            ) : (status == "authenticated" ? <>

              <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
               <Link href={"/profile"}> <User className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Account</span></Link>
              </Button>

              {/* Wishlist */}
              <Link href={"/wishlist"}>
                <Button variant="ghost" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center font-medium">
                      {wishlistCount}
                    </span>
                  )}
                  <span className="sr-only">Wishlist</span>
                </Button>
              </Link>

              {/* Shopping Cart */}
              <Link href={"/cart"}>
                <Button variant="ghost" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10">
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center font-medium">
                    {isLoading ? <Loader2 className="animate-spin h-3 w-3" /> : cartCount}
                  </span>
                  <span className="sr-only">Shopping cart</span>
                </Button>
              </Link>
              <div className="hidden sm:flex gap-2 items-center ms-3">
                <p className="text-sm text-muted-foreground">Hi {data.user.name?.split(" ")[0]}</p>
                <Button onClick={()=>signOut()} variant="ghost" size="icon" className="h-9 w-9">
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">Log out</span>
                </Button>
              </div>
            </> :
              <Link href={"/auth/login"} className="hidden sm:inline-flex">
                <Button variant="default" size="sm" className="h-9 px-4">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={cn(
        "md:hidden absolute w-full border-t bg-background/98 backdrop-blur-md transition-all duration-300 ease-in-out",
        isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
      )}>
        <div className="container mx-auto px-3 sm:px-4 py-4">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 touch-manipulation",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            
            {/* Mobile User Actions */}
            {/* {status === "authenticated" && (
              <div className="border-t pt-4 mt-4 space-y-2">
                <div className="flex items-center px-4 py-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4 mr-2" />
                  {data.user.name?.split(" ")[0]}
                </div>
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
                >
                  Profile
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                  {cartCount > 0 && (
                    <span className="ml-auto h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center font-medium">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 w-full text-left"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              </div>
            )} */}
            
            {status === "unauthenticated" && (
              <div className="border-t pt-4 mt-4">
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium bg-primary text-primary-foreground shadow-sm transition-all duration-200"
                >
                  Login
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}