import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../utils/api";
import { formatPrice, getOriginalPrice } from "../utils/format";
import { useShop } from "../context/ShopContext";
import { Footer } from "../Components/Footer";
import Icon from "../Components/Icon";

function ProductDetails() {
  const { id } = useParams();
  const [result, setResult] = useState({ id: null, product: null, error: "" });
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleWishlist, isWishlisted } = useShop();

  useEffect(() => {
    let active = true;
    getProductById(id)
      .then((data) => {
        if (active) setResult({ id, product: data, error: "" });
      })
      .catch((requestError) => {
        if (active) setResult({ id, product: null, error: requestError.message || "Product not found." });
      });
    return () => { active = false; };
  }, [id]);

  const isCurrentProduct = result.id === id;
  const loading = !isCurrentProduct;
  const product = isCurrentProduct ? result.product : null;
  const error = isCurrentProduct ? result.error : "";

  if (loading) return <main className="page-container inner-page"><div className="state-panel"><span className="loader-spinner" /><h2>Loading product details</h2><p>Just a moment while we get everything ready.</p></div><Footer /></main>;
  if (error || !product) return <><main className="page-container inner-page"><div className="state-panel"><span className="state-icon">!</span><h2>We couldn't find that product</h2><p>{error || "This product may no longer be available."}</p><Link className="button button-primary" to="/products">Back to shop</Link></div></main><Footer /></>;

  const originalPrice = getOriginalPrice(product);
  const hasDiscount = originalPrice > Number(product.price || 0);
  const saved = isWishlisted(product.id);
  const inStock = product.stock === undefined || product.stock === null || Number(product.stock) > 0;

  return (
    <>
      <main className="page-container inner-page product-detail-page">
        <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/products">Shop</Link><span>/</span><span>{product.name}</span></div>
        <div className="detail-layout">
          <div className="detail-image-panel">
            {product.imageUrl ? <img src={product.imageUrl} alt={product.name} /> : <span className="detail-image-fallback">{(product.name || "P").slice(0, 1)}</span>}
            {hasDiscount && <span className="detail-offer-label">Special price</span>}
          </div>
          <div className="detail-information">
            {product.category && <span className="section-kicker">{product.category}</span>}
            <h1>{product.name}</h1>
            {product.rating !== undefined && product.rating !== null && product.rating !== "" && <div className="detail-rating"><Icon name="star" size={17} fill="currentColor" /> <strong>{product.rating}</strong><span>Store rating</span></div>}
            <div className="detail-price-block"><strong>{formatPrice(product.price)}</strong>{hasDiscount && <del>{formatPrice(originalPrice)}</del>}</div>
            {hasDiscount && <p className="price-note">An offer is available on this product.</p>}
            <div className="detail-divider" />
            <div className="detail-description"><h2>About this product</h2><p>{product.description || "Product description has not been provided yet."}</p></div>
            <div className={`stock-message ${inStock ? "in-stock" : "out-of-stock"}`}><span />{inStock ? (product.stock !== undefined && product.stock !== null ? `${product.stock} available` : "Availability shown at checkout") : "Currently out of stock"}</div>
            <div className="detail-actions">
              <div className="quantity-control" aria-label="Quantity">
                <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Icon name="minus" size={16} /></button>
                <span>{quantity}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => Math.min(99, value + 1))}><Icon name="plus" size={16} /></button>
              </div>
              <button className="button button-primary detail-add-button" type="button" disabled={!inStock} onClick={() => addToCart(product, quantity)}><Icon name="bag" size={18} /> Add to bag</button>
              <button className={`detail-wishlist-button ${saved ? "is-saved" : ""}`} type="button" aria-label={saved ? "Remove from wishlist" : "Add to wishlist"} onClick={() => toggleWishlist(product)}><Icon name="heart" size={20} fill={saved ? "currentColor" : "none"} /></button>
            </div>
            <div className="detail-promises"><span><Icon name="shield" size={18} /> Secure shopping experience</span><span><Icon name="truck" size={18} /> Delivery information at checkout</span></div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ProductDetails;
