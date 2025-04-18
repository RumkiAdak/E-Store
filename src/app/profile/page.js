'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/auth/profile');
        if (!res.ok) throw new Error('Unauthorized');
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error('Error loading profile:', err);
        router.push('/login');
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-blue-700">Your Profile</h1>

      {user ? (
        <div className="bg-white p-6 rounded shadow-md">
          <p className="text-xl mb-4">Welcome, <span className="font-bold text-blue-600">{user.name}</span></p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-100 p-4 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">Orders</h2>
              <p className="text-gray-700">You have no recent orders.</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-purple-800 mb-2">Wishlist</h2>
              <p className="text-gray-700">Your wishlist is empty.</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-yellow-800 mb-2">Coupons</h2>
              <p className="text-gray-700">No available coupons at this time.</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md shadow"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading profile...</p>
      )}
    </div>
  );
}
