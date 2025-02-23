import { create } from "zustand";

interface ProductState {
  product: string;
  error: string;
  loading: boolean;
  setProduct: (product: string) => void;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  product: "",
  error: "",
  loading: false,
  setProduct: (product: string) => set({ product }),
  setError: (error: string) => set({ error }),
  setLoading: (loading: boolean) => set({ loading })
}));