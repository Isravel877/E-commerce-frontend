import { useEffect, useState } from "react";
import { getProducts } from "../utils/api";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getProducts()
      .then((data) => {
        if (!active) return;
        setProducts(Array.isArray(data) ? data : []);
        setError("");
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || "Please try again later.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  return { products, loading, error };
}
