import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { formatPrice, getOriginalPrice } from "../utils/format";
import Icon from "./Icon";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const originalPrice = getOriginalPrice(product);
  const hasDiscount = originalPrice > Number(product.price || 0);
  const saved = isWishlisted(product.id);

  return (
    <article className="product-card">
      <button className="product-image-button" type="button" onClick={() => navigate(`/product/${product.id}`)} aria-label={`View ${product.name}`}>
        <span className="product-image-frame">
          {product.imageUrl ? (
            <img className="product-image" src={product.imageUrl} alt={product.name || "Product"} loading="lazy" />
          ) : (
            <span className="image-fallback">{(product.name || "P").slice(0, 1).toUpperCase()}</span>
          )}
        </span>
        {hasDiscount && <span className="product-label">Offer</span>}
      </button>
      <button
        className={`wishlist-button ${saved ? "is-saved" : ""}`}
        type="button"
        aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={saved}
        onClick={() => toggleWishlist(product)}
      >
        <Icon name="heart" size={19} fill={saved ? "currentColor" : "none"} />
      </button>
      <div className="product-card-content">
        {product.category && <span className="product-category">{product.category}</span>}
        <button className="product-title" type="button" onClick={() => navigate(`/product/${product.id}`)}>{product.name}</button>
        {product.rating !== null && product.rating !== undefined && product.rating !== "" && (
          <span className="product-rating"><Icon name="star" size={14} fill="currentColor" /> {product.rating}</span>
        )}
        <div className="product-price-row">
          <strong>{formatPrice(product.price)}</strong>
          {hasDiscount && <del>{formatPrice(originalPrice)}</del>}
        </div>
        <button className="button button-primary product-add-button" type="button" onClick={() => addToCart(product)}>
          <Icon name="bag" size={17} /> Add to bag
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
