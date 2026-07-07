"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type { Product } from "@/types";

/* ── Types ──────────────────────────────────────────────────── */
export interface CartItem {
  product: Product;
  qty: number;
  size: string;
  color: string;
}

interface CartState {
  items: CartItem[];
  open: boolean;
}

type CartAction =
  | { type: "ADD";    product: Product; size: string; color: string }
  | { type: "REMOVE"; id: string; size: string; color: string }
  | { type: "SET_QTY"; id: string; size: string; color: string; qty: number }
  | { type: "CLEAR" }
  | { type: "OPEN" }
  | { type: "CLOSE" };

/* ── Reducer ────────────────────────────────────────────────── */
function key(id: string, size: string, color: string) {
  return `${id}__${size}__${color}`;
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const k = key(action.product.id, action.size, action.color);
      const exists = state.items.find(
        (i) => key(i.product.id, i.size, i.color) === k
      );
      return {
        ...state,
        // do NOT auto-open the cart — only OPEN action does that
        items: exists
          ? state.items.map((i) =>
              key(i.product.id, i.size, i.color) === k
                ? { ...i, qty: i.qty + 1 }
                : i
            )
          : [
              ...state.items,
              { product: action.product, qty: 1, size: action.size, color: action.color },
            ],
      };
    }
    case "REMOVE":
      return {
        ...state,
        items: state.items.filter(
          (i) => key(i.product.id, i.size, i.color) !== key(action.id, action.size, action.color)
        ),
      };
    case "SET_QTY":
      return {
        ...state,
        items: action.qty < 1
          ? state.items.filter(
              (i) => key(i.product.id, i.size, i.color) !== key(action.id, action.size, action.color)
            )
          : state.items.map((i) =>
              key(i.product.id, i.size, i.color) === key(action.id, action.size, action.color)
                ? { ...i, qty: action.qty }
                : i
            ),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "OPEN":
      return { ...state, open: true };
    case "CLOSE":
      return { ...state, open: false };
    default:
      return state;
  }
}

/* ── Context ────────────────────────────────────────────────── */
interface CartContextValue {
  items: CartItem[];
  open: boolean;
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product, size?: string, color?: string) => void;
  removeItem: (id: string, size: string, color: string) => void;
  setQty: (id: string, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], open: false });

  const addItem = useCallback(
    (product: Product, size = "M", color = product.colors[0] ?? "Default") => {
      dispatch({ type: "ADD", product, size, color });
    },
    []
  );

  const removeItem = useCallback(
    (id: string, size: string, color: string) =>
      dispatch({ type: "REMOVE", id, size, color }),
    []
  );

  const setQty = useCallback(
    (id: string, size: string, color: string, qty: number) =>
      dispatch({ type: "SET_QTY", id, size, color, qty }),
    []
  );

  const clearCart  = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const openCart   = useCallback(() => dispatch({ type: "OPEN" }), []);
  const closeCart  = useCallback(() => dispatch({ type: "CLOSE" }), []);

  const totalItems = useMemo(
    () => state.items.reduce((s, i) => s + i.qty, 0),
    [state.items]
  );

  const totalPrice = useMemo(
    () => state.items.reduce((s, i) => s + i.product.price * i.qty, 0),
    [state.items]
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        open: state.open,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        setQty,
        clearCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
