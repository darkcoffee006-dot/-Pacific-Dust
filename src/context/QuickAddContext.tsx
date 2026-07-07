"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "@/types";

interface QuickAddContextValue {
  product: Product | null;
  open: (p: Product) => void;
  close: () => void;
}

const QuickAddContext = createContext<QuickAddContextValue | null>(null);

export function QuickAddProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null);
  return (
    <QuickAddContext.Provider value={{
      product,
      open:  (p) => setProduct(p),
      close: ()  => setProduct(null),
    }}>
      {children}
    </QuickAddContext.Provider>
  );
}

export function useQuickAdd() {
  const ctx = useContext(QuickAddContext);
  if (!ctx) throw new Error("useQuickAdd must be inside <QuickAddProvider>");
  return ctx;
}
