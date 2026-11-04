import ProductCard from "./ProductCard";

export default function ProductsGrid({ products, loading, error, emptyTitle = "No products found", emptyText = "Try a different search or explore all products." }) {
  if (loading) {
    return <div className="product-grid" aria-label="Loading products">{Array.from({ length: 8 }, (_, index) => <div className="product-skeleton" key={index}><div className="skeleton-image" /><div className="skeleton-line" /><div className="skeleton-line short" /><div className="skeleton-button" /></div>)}</div>;
  }
  if (error) return <div className="state-panel"><span className="state-icon">!</span><h2>We couldn't load the products</h2><p>{error}</p><p className="state-hint">Check that your backend is running and that the API URL is configured correctly.</p></div>;
  if (!products.length) return <div className="state-panel"><span className="state-icon">⌕</span><h2>{emptyTitle}</h2><p>{emptyText}</p></div>;
  return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
