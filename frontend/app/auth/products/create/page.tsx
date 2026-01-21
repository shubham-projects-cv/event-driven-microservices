"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCreateProduct } from "@/hooks/useProducts";

export default function CreateProductPage() {
  const router = useRouter();
  const createProduct = useCreateProduct();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const onSubmit = async () => {
    if (!form.name || !form.price) {
      toast.error("Name and price are required");
      return;
    }

    createProduct.mutate(
      {
        name: form.name,
        price: Number(form.price),
        description: form.description,
      },
      {
        onSuccess: () => {
          toast.success("Product created");
          router.push("/auth/products");
        },
      },
    );
  };

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardHeader>
        <h2 className="text-xl font-semibold">Create Product</h2>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <Input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <Textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <Button
          onClick={onSubmit}
          className="w-full"
          disabled={createProduct.isPending}
        >
          Create
        </Button>
      </CardContent>
    </Card>
  );
}
