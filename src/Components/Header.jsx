import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import Icon from "./Icon";

export function Header() {
  const { cartCount, wishlist } = useShop();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();
    navigate(`/products${query.trim() ? `?search=${encodeURIComponent(query.trim())}` : ""}`);
    setMenuOpen(false);
    setSearchOpen(false);
  }

  const closePanels = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  const navigation = (
    <>
      <NavLink to="/" end onClick={closePanels}>Home</NavLink>
      <NavLink to="/products" onClick={closePanels}>Shop</NavLink>
      <a href="/#categories" onClick={closePanels}>Categories</a>
      <NavLink to="/orders" onClick={closePanels}>My orders</NavLink>
    </>
  );

  return (
    <header className="site-header">
      <div className="header-main page-container">
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => { setMenuOpen((open) => !open); setSearchOpen(false); }}
        >
          <Icon name={menuOpen ? "close" : "menu"} size={21} />
        </button>

        <Link className="brand" to="/" onClick={closePanels} aria-label="ISROZONE home">
          <span className="brand-mark" aria-hidden="true">I</span>
          <span className="brand-wordmark">
            <span className="brand-name">ISRO<span>ZONE</span></span>
            <span className="brand-tagline">EVERYDAY ESSENTIALS</span>
          </span>
        </Link>

        <nav className="desktop-navigation" aria-label="Main navigation">
          {navigation}
        </nav>

        <form className="header-search" onSubmit={handleSearch} role="search">
          <Icon name="search" size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            placeholder="Search products"
            aria-label="Search products"
          />
          <button type="submit" aria-label="Search"><Icon name="arrow" size={17} /></button>
        </form>

        <div className="header-actions">
          <NavLink className="header-action account-action" to="/login" aria-label="Account">
            <span className="header-action-icon"><Icon name="user" size={19} /></span>
            <span className="header-action-label">Account</span>
          </NavLink>
          <NavLink className="header-action wishlist-action" to="/wishlist" aria-label={`Wishlist, ${wishlist.length} items`}>
            <span className="header-action-icon action-icon-wrap">
              <Icon name="heart" size={19} />
              {wishlist.length > 0 && <span className="count-badge">{wishlist.length}</span>}
            </span>
            <span className="header-action-label">Saved</span>
          </NavLink>
          <NavLink className="header-action cart-action" to="/cart" aria-label={`Shopping bag, ${cartCount} items`}>
            <span className="header-action-icon action-icon-wrap">
              <Icon name="bag" size={20} />
              {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
            </span>
            <span className="header-action-label">Bag</span>
          </NavLink>
          <button
            className="mobile-search-toggle"
            type="button"
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
            aria-controls="mobile-search-panel"
            onClick={() => { setSearchOpen((open) => !open); setMenuOpen(false); }}
          >
            <Icon name={searchOpen ? "close" : "search"} size={20} />
          </button>
        </div>
      </div>

      <div id="mobile-search-panel" className={`mobile-search-panel ${searchOpen ? "is-open" : ""}`}>
        <form className="mobile-search page-container" onSubmit={handleSearch} role="search">
          <Icon name="search" size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            placeholder="What are you looking for?"
            aria-label="Search products"
          />
          <button type="submit" aria-label="Submit search"><Icon name="arrow" size={18} /></button>
        </form>
      </div>

      <div id="mobile-navigation" className={`mobile-navigation ${menuOpen ? "is-open" : ""}`}>
        <nav className="mobile-navigation-links page-container" aria-label="Mobile navigation">
          {navigation}
        </nav>
        <div className="mobile-navigation-foot page-container">
          <span>Discover something useful.</span>
          <NavLink to="/login" onClick={closePanels}>Sign in <Icon name="arrow" size={15} /></NavLink>
        </div>
      </div>
    </header>
  );
}
