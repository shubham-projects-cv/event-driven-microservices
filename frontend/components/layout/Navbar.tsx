"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const isAuth =
    typeof window !== "undefined" && !!localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    router.replace("/auth/login");
  };

  return (
    <nav className="flex items-center justify-between border-b px-6 py-4">
      <h1 className="text-lg font-semibold">Product App</h1>

      <div className="flex gap-3">
        {isAuth ? (
          <>
            <Link href="/auth/products">
              <Button variant="ghost">Products</Button>
            </Link>
            <Button variant="destructive" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          pathname !== "/auth/login" && (
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
          )
        )}
      </div>
    </nav>
  );
}
