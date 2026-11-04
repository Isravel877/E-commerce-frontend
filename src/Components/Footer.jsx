import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-main">
        <div className="footer-brand-block">
          <Link className="brand footer-brand" to="/">
            <span className="brand-mark">IZ</span>
            <span className="brand-name">ISRO<span>ZONE</span></span>
          </Link>
          <p>Discover useful finds and everyday essentials, all in one simple place.</p>
        </div>
        <div className="footer-column">
          <h3>Explore</h3>
          <Link to="/">Home</Link>
          <Link to="/products">All products</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>
        <div className="footer-column">
          <h3>Your account</h3>
          <Link to="/login">Sign in</Link>
          <Link to="/orders">My orders</Link>
          <Link to="/cart">Shopping bag</Link>
        </div>
        <div className="footer-note">
          <h3>Shop with confidence</h3>
          <p>Clear product details and a simple shopping experience, every step of the way.</p>
        </div>
      </div>
      <div className="page-container footer-bottom">
        <span>© {new Date().getFullYear()} ISROZONE. All rights reserved.</span>
        <span>Made for a better everyday shopping experience.</span>
      </div>
    </footer>
  );
}
