import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductsGrid from "../Components/ProductsGrid";
import Icon from "../Components/Icon";
import useProducts from "../hooks/useProducts";

export default function Shop() {
  const { products, loading, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState("recommended");
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const categories = [...new Set(products.map((product) => product.category).filter(Boolean))].sort();

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesSearch = !query || `${product.name || ""} ${product.category || ""} ${product.description || ""}`.toLowerCase().includes(query);
      const matchesCategory = !category || String(product.category || "").toLowerCase() === category.toLowerCase();
      return matchesSearch && matchesCategory;
    });
    if (sort === "price-low") filtered.sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === "price-high") filtered.sort((a, b) => Number(b.price) - Number(a.price));
    if (sort === "name") filtered.sort((a, b) => String(a.name).localeCompare(String(b.name)));
    return filtered;
  }, [products, search, category, sort]);

  function updateCategory(value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set("category", value);
    else next.delete("category");
    setSearchParams(next);
  }

  return (
    <main className="page-container inner-page shop-page">
      <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Shop</span></div>
      <div className="shop-intro"><div><span className="section-kicker">THE ISROZONE COLLECTION</span><h1>Shop all products</h1><p>Take a look around and find something useful for your day.</p></div><span className="product-total">{loading ? "Loading products..." : `${filteredProducts.length} ${filteredProducts.length === 1 ? "product" : "products"}`}</span></div>
      <div className="shop-toolbar">
        <label className="filter-control"><span>Category</span><select value={category} onChange={(event) => updateCategory(event.target.value)}><option value="">All categories</option>{categories.map((item) => <option value={item} key={item}>{item}</option>)}</select><Icon name="chevron" size={16} /></label>
        <label className="filter-control sort-control"><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="recommended">Recommended</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name: A to Z</option></select><Icon name="chevron" size={16} /></label>
      </div>
      {search && <div className="search-summary">Showing results for <strong>“{search}”</strong><button type="button" onClick={() => { const next = new URLSearchParams(searchParams); next.delete("search"); setSearchParams(next); }}>Clear search</button></div>}
      <ProductsGrid products={filteredProducts} loading={loading} error={error} emptyTitle="No matching products" emptyText="Try changing your search or selecting another category." />
    </main>
  );
}
