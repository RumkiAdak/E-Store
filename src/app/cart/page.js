'use client';

import { useCart } from '@/app/context/CartContext';
import Container from '@/components/Container';
import { useEffect } from 'react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const grandTotal = cartItems.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return total + price * quantity;
  }, 0);

  useEffect(() => {
    console.log('Cart Items:', cartItems);
  }, [cartItems]);

  const handlePlaceOrder = () => {
    alert('🛍️ Order placed successfully!');
    // You can later add API call here to create an order in the database
  };

  return (
    <Container>
      <h1 className="text-3xl my-6 font-bold">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map(item => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 1;
            const total = price * quantity;

            return (
              <div
                key={item.id}
                className="flex flex-col md:flex-row justify-between items-center gap-6 border-b pb-6"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-28 h-28 object-contain border rounded-md"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <div className="flex items-center gap-3 my-2">
                      <span className="text-gray-700">Quantity:</span>
                      <button
                        onClick={() => updateQuantity(item.id, quantity - 1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-lg">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, quantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-gray-700">Price: ${price.toFixed(2)}</p>
                    <p className="font-semibold text-gray-900">
                      Total: ${total.toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:underline font-medium"
                >
                  Remove
                </button>
              </div>
            );
          })}

          <div className="text-right mt-8">
            <p className="text-2xl font-bold text-gray-900 mb-4">
              Grand Total: ${grandTotal.toFixed(2)}
            </p>
            <button
              onClick={handlePlaceOrder}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </Container>
  );
}
