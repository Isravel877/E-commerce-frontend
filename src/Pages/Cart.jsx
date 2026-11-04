import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { formatPrice } from "../utils/format";
import { Footer } from "../Components/Footer";
import Icon from "../Components/Icon";

export default function Cart() {
  const { cart, subtotal, updateQuantity, removeFromCart } = useShop();
  const navigate = useNavigate();

  return (
    <>
      <main className="page-container inner-page cart-page">
        <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Shopping bag</span></div>
        <div className="shop-intro"><div><span className="section-kicker">YOUR SELECTIONS</span><h1>Shopping bag</h1><p>Review your items before moving on.</p></div><span className="product-total">{cart.reduce((total, item) => total + item.quantity, 0)} items</span></div>
        {cart.length === 0 ? (
          <div className="empty-cart-panel"><span className="empty-cart-icon"><Icon name="bag" size={31} /></span><h2>Your bag is waiting</h2><p>You haven't added anything yet. Browse the shop to find something you like.</p><Link className="button button-primary" to="/products">Explore products <Icon name="arrow" size={17} /></Link></div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-list">
              {cart.map((item) => <article className="cart-item" key={item.id}>
                <Link className="cart-item-image" to={`/product/${item.id}`}>{item.imageUrl ? <img src={item.imageUrl} alt={item.name} /> : <span>{(item.name || "P").slice(0, 1)}</span>}</Link>
                <div className="cart-item-info"><span className="product-category">{item.category || "Product"}</span><Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link><strong>{formatPrice(item.price)}</strong><div className="quantity-control cart-quantity"><button type="button" aria-label="Decrease quantity" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Icon name="minus" size={14} /></button><span>{item.quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Icon name="plus" size={14} /></button></div></div>
                <div className="cart-item-end"><strong>{formatPrice(Number(item.price || 0) * item.quantity)}</strong><button className="remove-item-button" type="button" onClick={() => removeFromCart(item.id)}><Icon name="trash" size={16} /> Remove</button></div>
              </article>)}
              <Link to="/products" className="continue-shopping"><Icon name="arrow" size={16} /> Continue shopping</Link>
            </div>
            <aside className="order-summary"><h2>Order summary</h2><div className="summary-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div className="summary-row"><span>Delivery</span><span className="muted-value">Calculated at checkout</span></div><div className="summary-divider" /><div className="summary-row summary-total"><span>Estimated total</span><strong>{formatPrice(subtotal)}</strong></div><p className="summary-note">Taxes and delivery charges, if applicable, will be shown before an order is placed.</p><button className="button button-primary checkout-button" type="button" onClick={() => navigate("/checkout")}>Continue to checkout <Icon name="arrow" size={17} /></button><div className="secure-note"><Icon name="lock" size={15} /> Your shopping bag is saved on this device.</div></aside>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
