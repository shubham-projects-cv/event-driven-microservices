import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  Product,
} from "@/services/product.api";

/* ---------- TYPES ---------- */

export interface CreateProductInput {
  name: string;
  price: number;
  description?: string;
}

export interface UpdateProductInput {
  id: string;
  data: {
    name?: string;
    price?: number;
    description?: string;
  };
}

/* ---------- QUERIES ---------- */

export const useProducts = () =>
  useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

export const useGetProduct = (id: string) =>
  useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });

/* ---------- MUTATIONS ---------- */

export const useCreateProduct = () => {
  const qc = useQueryClient();

  return useMutation<Product, Error, CreateProductInput>({
    mutationFn: createProduct,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created");
    },
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();

  return useMutation<Product, Error, UpdateProductInput>({
    mutationFn: ({ id, data }) => updateProduct(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated");
    },
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted");
    },
  });
};
