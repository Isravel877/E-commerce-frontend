import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { Footer } from "../Components/Footer";
import ProductsGrid from "../Components/ProductsGrid";

export default function Wishlist() {
  const { wishlist } = useShop();
  return <><main className="page-container inner-page"><div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Wishlist</span></div><div className="shop-intro"><div><span className="section-kicker">SAVED FOR LATER</span><h1>Your wishlist</h1><p>Products you have saved for another time.</p></div><span className="product-total">{wishlist.length} saved</span></div><ProductsGrid products={wishlist} loading={false} error="" emptyTitle="Your wishlist is empty" emptyText="Tap the heart on a product to keep it here for later." /></main><Footer /></>;
}
