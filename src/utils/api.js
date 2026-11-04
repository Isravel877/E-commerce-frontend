const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080").replace(/\/$/, "");

async function request(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Unable to load products (HTTP ${response.status}). Please try again.`);
  }
  return response.json();
}

export function getProducts() {
  return request("/products");
}

export function getProductById(id) {
  return request(`/products/${encodeURIComponent(id)}`);
}

export { API_BASE_URL };
