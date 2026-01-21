"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLogin } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const login = useLogin();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = () => {
    login.mutate(form, {
      onSuccess: () => router.push("/products"),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-xl font-semibold">
          Login
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button className="w-full" onClick={submit} disabled={login.isPending}>
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
