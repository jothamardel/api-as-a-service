import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number | null;
  image: string;
  setCartItems: (val: number) => void;
  cartItems: number;
}

export default function ProductCard({
  name,
  price,
  image,
  setCartItems,
  cartItems,
}: ProductCardProps) {
  const handleAddToCart = () => {
    // Implement add to cart logic here
    console.log(`Added ${name} to cart`);
    setCartItems(cartItems + 1);
  };

  const formattedPrice =
    price != null ? `$${price.toFixed(2)}` : "Price not available";

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-4">
        <Link
          href={`/cart`}
          className="block relative aspect-square overflow-hidden rounded-lg"
        >
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform hover:scale-105"
          />
        </Link>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">
            <Link href={`/cart`} className="hover:underline">
              {name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-600">{formattedPrice}</p>
        </div>
      </div>
      <div className="px-4 py-4 bg-gray-50 border-t border-gray-200">
        <button
          onClick={handleAddToCart}
          className="w-full bg-black rounded-lg flex p-4 items-center justify-center"
        >
          <ShoppingCart className="mr-2 h-4 w-4" aria-hidden="true" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
