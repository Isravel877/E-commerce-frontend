import { Link } from "react-router-dom";
import { Footer } from "../Components/Footer";
import Icon from "../Components/Icon";

export default function OrderConfirmation() {
  return <><main className="page-container inner-page"><div className="order-confirmation-panel"><span className="confirmation-icon"><Icon name="bag" size={29} /></span><span className="section-kicker">ORDER STATUS</span><h1>Order confirmation</h1><p>This page is ready for a confirmed order reference from your backend. The current frontend does not place orders, so no order has been created.</p><Link className="button button-primary" to="/products">Continue shopping <Icon name="arrow" size={17} /></Link></div></main><Footer /></>;
}
