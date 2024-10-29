
"use client";

import { useState } from "react";
import Link from "next/link";
// import { ShoppingCart, Search, Menu } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";
// import { Toaster } from "@/components/ui/toaster";
import ProductCard from "@/components/ProductCard";
import { Header } from "@/components/Header";

const products = [
  {
    id: 1,
    name: "Dress Shoes",
    price: 89.99,
    image:
      "https://img.freepik.com/free-photo/fashion-pink-glamour-women-heels_1203-6509.jpg?t=st=1730187152~exp=1730190752~hmac=2f19110f27d2693d8f8c855b038c4a08b18666cd94b92dc9e41035d3494ac0d9&w=1800",
  },
  {
    id: 2,
    name: "Casual Sneakers",
    price: 59.99,
    image:
      "https://img.freepik.com/free-photo/pair-trainers_144627-3799.jpg?t=st=1730187559~exp=1730191159~hmac=dddc48cb745cac64f1f172bff850399e1f96ec964ea4d4c38982adbfe329e73f&w=1380",
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 99.99,
    image:
      "https://img.freepik.com/free-photo/fashion-shoes-sneakers_1203-7529.jpg?t=st=1730187757~exp=1730191357~hmac=11b488acc6fd8cb373ff4cc72f557ddd93dc1455b3932041d7cb619b4cec8ae2&w=1800",
  },
  {
    id: 4,
    name: "Hiking Boots",
    price: 129.99,
    image:
      "https://img.freepik.com/premium-photo/yellow-orange-shoe-with-black-stripe_1313274-6892.jpg?w=1060",
  },
];

export default function Home() {
  // const { toast } = useToast();
  const [cartItems, setCartItems] = useState<number>(0);

  // const addToCart = (product: (typeof products)[0]) => {
  //   setCartItems((prevItems) => prevItems + 1);
  //   toast({
  //     title: "Product added to cart",
  //     description: `${product.name} has been added to your cart.`,
  //   });
  // };

  console.log(cartItems);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header cartItems={cartItems} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
            <img
              src="/flash.jpg"
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary bg-opacity-70 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4 ">
                  Summer Sale
                </h1>
                <p className="text-xl md:text-2xl text-primary-foreground mb-6">
                  Up to 50% off on selected items
                </p>
                <button>Shop Now</button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 ">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <ProductCard
                key={i}
                {...product}
                setCartItems={setCartItems}
                cartItems={cartItems}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-secondary text-secondary-foreground mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Returns & Exchanges
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Shipping Information
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Twitter
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-muted-foreground">
            <p>&copy; 2024 ShoeStore. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* <Toaster /> */}
    </div>
  );
}
