import { create } from "zustand";

interface ProductState {
  products: any | undefined;
  setProducts: (data: any | null) => void;
}

export const useProductStore = create<ProductState>()((set) => ({
  products: [],
  setProducts: (value: any) => {
    set((state: any) => {
      return { ...state, products: value };
    });
  },
}));
