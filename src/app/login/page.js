'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the POST request to the login API
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      // If the response is OK, redirect to the profile page
      if (res.ok) {
        router.push('/profile');
      } else {
        // Show an alert if login fails
        const data = await res.json();
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <input
        className="border w-full p-2"
        placeholder="Email"
        type="email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        className="border w-full p-2"
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}
