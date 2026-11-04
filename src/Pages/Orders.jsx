import { Link } from "react-router-dom";
import { Footer } from "../Components/Footer";
import Icon from "../Components/Icon";

export default function Orders() {
  return <><main className="page-container inner-page"><div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>My orders</span></div><div className="empty-cart-panel orders-empty"><span className="empty-cart-icon"><Icon name="bag" size={30} /></span><h1>Order history</h1><p>Your orders will appear here once an order-history API is connected to this storefront.</p><Link className="button button-primary" to="/products">Explore products</Link></div></main><Footer /></>;
}
