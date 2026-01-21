"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black text-white">
      <Link href="/auth/products" className="font-bold hover:text-gray-300">
        Products
      </Link>
      <button
        onClick={logout}
        className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
      >
        Logout
      </button>
    </nav>
  );
}
