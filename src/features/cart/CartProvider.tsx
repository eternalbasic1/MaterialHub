"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Check, X } from "lucide-react";
import type { CartItem } from "../catalog/types";
import { products } from "../catalog/data";
import { addItem, calculateTotals, cartKey, restoreCart } from "./logic";
type CartContextValue = {
  items: CartItem[];
  ready: boolean;
  coupon: string;
  setCoupon: (value: string) => void;
  add: (item: CartItem) => void;
  update: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  notify: (message: string) => void;
};
const CartContext = createContext<CartContextValue | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try {
        setItems(
          restoreCart(localStorage.getItem("materialhub-cart-v1"), products),
        );
        setCoupon(
          localStorage.getItem("materialhub-coupon") === "FREE300"
            ? "FREE300"
            : "",
        );
      } catch {
        /* Storage may be unavailable; keep the cart in memory. */
      }
      setReady(true);
    });
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem("materialhub-cart-v1", JSON.stringify(items));
        localStorage.setItem("materialhub-coupon", coupon);
      } catch {
        /* Storage may be unavailable; keep the cart in memory. */
      }
    }
  }, [items, ready, coupon]);
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 3500);
    return () => clearTimeout(timer);
  }, [message]);
  const add = (item: CartItem) => {
    if (!ready) return;
    setItems((current) => addItem(current, item));
    setMessage("Added to your cart.");
  };
  const update = (key: string, quantity: number) => {
    if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 9999)
      return;
    setItems((current) =>
      current.map((item) =>
        cartKey(item) === key ? { ...item, quantity } : item,
      ),
    );
  };
  const remove = (key: string) => {
    setItems((current) => current.filter((item) => cartKey(item) !== key));
    setMessage("Item removed from your cart.");
  };
  const clear = () => {
    setItems([]);
    setCoupon("");
  };
  return (
    <CartContext.Provider
      value={{
        items,
        ready,
        coupon,
        setCoupon,
        add,
        update,
        remove,
        clear,
        notify: setMessage,
      }}
    >
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-24 left-1/2 z-[80] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 sm:bottom-7"
      >
        {message && (
          <div className="flex items-center gap-3 rounded-lg border border-forest-line bg-white p-4 text-sm shadow-2xl">
            <span className="rounded-full bg-forest-soft p-1 text-forest">
              <Check size={17} />
            </span>
            <p className="flex-1">{message}</p>
            <button
              aria-label="Dismiss notification"
              onClick={() => setMessage("")}
              className="icon-button"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    </CartContext.Provider>
  );
}
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("CartProvider is required");
  return context;
}
export function useCartTotals() {
  const { items, coupon } = useCart();
  return calculateTotals(items, products, coupon);
}
