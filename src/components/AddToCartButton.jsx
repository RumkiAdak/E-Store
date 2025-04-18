'use client';

import { useCart } from '@/app/context/CartContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AddToCartButton({ product }) {
  const { cartItems, addToCart } = useCart();
  const router = useRouter();
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const exists = cartItems.some(item => item.id === product.id);
    setIsInCart(exists);
  }, [cartItems, product.id]);

  const handleAdd = () => {
    addToCart(product);
    setIsInCart(true);
  };

  const handleGoToCart = () => {
    router.push('/cart');
  };

  return isInCart ? (
    <button
      onClick={handleGoToCart}
      className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
    >
      Go to Cart
    </button>
  ) : (
    <button
      onClick={handleAdd}
      className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
    >
      Add to Cart
    </button>
  );
}
