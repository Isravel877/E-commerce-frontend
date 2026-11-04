import { useState } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { formatPrice } from "../utils/format";
import { Footer } from "../Components/Footer";
import Icon from "../Components/Icon";

export default function Checkout() {
  const { cart, subtotal, notify } = useShop();
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", address: "", city: "", postalCode: "" });
  const [showInfo, setShowInfo] = useState(false);
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  function handleSubmit(event) {
    event.preventDefault();
    setShowInfo(true);
    notify("Your details are valid. Order submission needs a backend checkout API.");
  }

  return <>
    <main className="page-container inner-page checkout-page">
      <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/cart">Shopping bag</Link><span>/</span><span>Checkout</span></div>
      <div className="shop-intro"><div><span className="section-kicker">ALMOST THERE</span><h1>Checkout</h1><p>Enter your delivery details.</p></div></div>
      {cart.length === 0 ? <div className="empty-cart-panel"><h2>Your bag is empty</h2><p>Add a product before continuing to checkout.</p><Link className="button button-primary" to="/products">Explore products</Link></div> : <div className="checkout-layout">
        <form className="checkout-form form-panel" onSubmit={handleSubmit}>
          <h2>Contact and delivery</h2><p className="form-intro">Your details are used to prepare the order. Nothing is submitted to a server in this frontend preview.</p>
          <div className="form-grid"><label className="form-field full-width"><span>Full name</span><input name="fullName" value={form.fullName} onChange={update} required autoComplete="name" placeholder="Your name" /></label><label className="form-field"><span>Email address</span><input name="email" type="email" value={form.email} onChange={update} required autoComplete="email" placeholder="you@example.com" /></label><label className="form-field"><span>Phone number</span><input name="phone" type="tel" value={form.phone} onChange={update} required autoComplete="tel" placeholder="Your phone number" /></label><label className="form-field full-width"><span>Delivery address</span><textarea name="address" rows="3" value={form.address} onChange={update} required autoComplete="street-address" placeholder="House number, street and area" /></label><label className="form-field"><span>City</span><input name="city" value={form.city} onChange={update} required autoComplete="address-level2" placeholder="City" /></label><label className="form-field"><span>PIN code</span><input name="postalCode" inputMode="numeric" value={form.postalCode} onChange={update} required autoComplete="postal-code" placeholder="PIN code" /></label></div>
          <div className="checkout-notice"><Icon name="shield" size={18} /><span>Secure checkout UI. Payment and order placement become available when the backend checkout API is connected.</span></div>
          <button className="button button-primary checkout-submit" type="submit">Review details <Icon name="arrow" size={17} /></button>
          {showInfo && <p className="inline-form-message" role="status">Your details passed browser validation. This project does not yet include an order or payment endpoint, so no order has been placed.</p>}
        </form>
        <aside className="order-summary checkout-summary"><h2>Your order</h2>{cart.map((item) => <div className="checkout-product-row" key={item.id}><span>{item.name} <small>× {item.quantity}</small></span><strong>{formatPrice(Number(item.price || 0) * item.quantity)}</strong></div>)}<div className="summary-divider" /><div className="summary-row summary-total"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><p className="summary-note">Delivery and taxes are not calculated by the current backend.</p><Link to="/cart" className="continue-shopping">Edit bag</Link></aside>
      </div>}
    </main>
    <Footer />
  </>;
}
