'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message); // "User created successfully"
        setForm({ name: '', email: '', password: '' }); // Reset form
        router.push('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Server error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4" autoComplete="off">
      <h1 className="text-2xl font-bold">Register</h1>
      <input
        className="border w-full p-2"
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
        autoComplete="off" // Disable autofill
      />
      <input
        className="border w-full p-2"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
        autoComplete="off" // Disable autofill
      />
      <input
        className="border w-full p-2"
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        required
        autoComplete="off" // Disable autofill
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
}
