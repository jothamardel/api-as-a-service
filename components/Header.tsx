import Link from "next/link";
import { ShoppingCart, Search, Menu } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

export function Header({ cartItems }: { cartItems?: number}) {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Shoe Store
        </Link>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="search"
              placeholder="Search for shoes..."
              className="pl-8 pr-4 py-2 w-64 bg-primary-foreground text-primary rounded-lg"
            />
            <Search
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary"
              size={20}
            />
          </div>
          <Link href="/checkout">
            <button className="relative flex">
              <ShoppingCart className="mr-2" size={20} />
              {cartItems}
            </button>
          </Link>
        </div>
        <button className="md:hidden text-primary-foreground">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}
