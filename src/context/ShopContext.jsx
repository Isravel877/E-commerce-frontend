import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const ShopContext = createContext(null);

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage("isrozone-cart", []));
  const [wishlist, setWishlist] = useState(() => readStorage("isrozone-wishlist", []));
  const [notice, setNotice] = useState("");

  useEffect(() => {
    localStorage.setItem("isrozone-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("isrozone-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const notify = useCallback((message) => {
    setNotice(message);
    window.clearTimeout(notify.timeoutId);
    notify.timeoutId = window.setTimeout(() => setNotice(""), 2600);
  }, []);

  const addToCart = useCallback((product, quantity = 1) => {
    if (!product?.id) return;
    setCart((current) => {
      const existing = current.find((item) => String(item.id) === String(product.id));
      if (existing) {
        return current.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...current, { ...product, quantity }];
    });
    notify(`${product.name || "Item"} added to your bag`);
  }, [notify]);

  const removeFromCart = useCallback((id) => {
    setCart((current) => current.filter((item) => String(item.id) !== String(id)));
    notify("Item removed from your bag");
  }, [notify]);

  const updateQuantity = useCallback((id, quantity) => {
    if (quantity < 1) return;
    setCart((current) => current.map((item) =>
      String(item.id) === String(id) ? { ...item, quantity } : item,
    ));
  }, []);

  const toggleWishlist = useCallback((product) => {
    if (!product?.id) return;
    const exists = wishlist.some((item) => String(item.id) === String(product.id));
    setWishlist((current) => exists
      ? current.filter((item) => String(item.id) !== String(product.id))
      : [...current, product]);
    notify(exists ? "Removed from your wishlist" : "Saved to your wishlist");
  }, [notify, wishlist]);

  const isWishlisted = useCallback((id) =>
    wishlist.some((item) => String(item.id) === String(id)), [wishlist]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + Number(item.price || 0) * item.quantity, 0);

  const value = useMemo(() => ({
    cart,
    wishlist,
    cartCount,
    subtotal,
    notice,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    isWishlisted,
    notify,
  }), [cart, wishlist, cartCount, subtotal, notice, addToCart, removeFromCart, updateQuantity, toggleWishlist, isWishlisted, notify]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used inside ShopProvider");
  return context;
}
