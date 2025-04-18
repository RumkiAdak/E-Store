'use client';

import styles from "@/styles/header.module.css";
import Container from "./Container";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  return (
    <header className={`${styles.header} py-3 px-1 shadow`}>
      <Container className="flex justify-between items-center">
        <div className="flex items-center">
        <Link href="/">
  <span className="text-pink-500 font-bold text-4xl cursor-pointer">
    E-Store<b className="text-black">.</b>
  </span>
</Link>
        </div>

        <div className={`${styles.searchBar} flex items-center`}>
          <input
            type="text"
            placeholder="Search for products..."
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            <FiSearch size={18} />
          </button>
        </div>

        <NavBar />
      </Container>
    </header>
  );
}

const NavBar = () => {
  const { cartItemCount } = useCart();
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <nav className="flex items-center gap-5">
      {/* Navigation Links */}
      <ul className="flex items-center gap-3 font-semibold">
        <li className={styles.navLink}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navLink}>
          <Link href="/store">Store</Link>
        </li>
      </ul>

      {/* Auth Buttons + Cart + Profile Icon */}
      <div className="flex items-center gap-4">
        {!user && (
          <div className="flex gap-3 text-sm font-semibold">
            <Link href="/login" className="text-gray-700 hover:text-pink-500">
              Login
            </Link>
            <Link href="/register" className="text-gray-700 hover:text-pink-500">
              Register
            </Link>
          </div>
        )}

        {/* Cart Icon */}
        <Link href="/cart">
          <div className="relative mr-2">
            <FiShoppingCart color="black" size={24} />
            {cartItemCount > 0 && (
              <span
                className={`${styles.cartBadge} absolute top-[-15px] right-[-20px] bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center`}
              >
                {cartItemCount}
              </span>
            )}
          </div>
        </Link>

        {/* Profile Icon Only (Dropdown on hover if logged in) */}
        <div className="relative group">
          <Link
            href="/profile"
            className="flex items-center text-gray-700 hover:text-pink-500"
          >
            <FiUser size={22} />
          </Link>

          {user && (
            <div className="absolute right-0 top-8 hidden group-hover:block bg-white border shadow rounded w-40 p-2 z-10">
              <p className="text-sm text-gray-700 mb-2 px-2">👋 {user.name}</p>
              <Link
                href="/profile"
                className="block px-2 py-1 hover:bg-gray-100 text-sm"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-2 py-1 hover:bg-gray-100 text-sm text-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
