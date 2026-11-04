import { Link } from "react-router-dom";
import { Footer } from "../Components/Footer";
import Icon from "../Components/Icon";
import ProductsGrid from "../Components/ProductsGrid";
import useProducts from "../hooks/useProducts";

function Home() {
  const { products, loading, error } = useProducts();
  const featuredProducts = products.slice(0, 8);
  const categories = [...new Set(products.map((product) => product.category).filter(Boolean))].slice(0, 6);

  return (
    <>
      <main>
        <section className="hero-section">
          <div className="page-container hero-content">
            <div className="hero-copy">
              <span className="eyebrow"><span className="eyebrow-dot" /> YOUR EVERYDAY SHOPPING DESTINATION</span>
              <h1>Good finds.<br /><span>Better everyday.</span></h1>
              <p>Explore useful products, discover something new, and enjoy a simpler way to shop for the things you need.</p>
              <div className="hero-actions">
                <Link className="button button-primary button-large" to="/products">Explore products <Icon name="arrow" size={18} /></Link>
                <a className="text-link" href="#featured">Discover what's new</a>
              </div>
              <div className="hero-trust-row">
                <span><Icon name="shield" size={17} /> Secure browsing</span>
                <span><Icon name="check" size={17} /> Clear product details</span>
                <span><Icon name="refresh" size={17} /> Easy-to-use shopping</span>
              </div>
            </div>
            <div className="hero-side-note" aria-hidden="true">
              <span className="hero-side-line" />
              <span>SHOP WITH<br />CLARITY</span>
            </div>
          </div>
        </section>

        <section className="benefit-strip page-container" aria-label="Shopping benefits">
          <div className="benefit-item"><span className="benefit-icon"><Icon name="truck" size={21} /></span><span><strong>Delivery details</strong><small>Shown with product information</small></span></div>
          <div className="benefit-item"><span className="benefit-icon"><Icon name="shield" size={21} /></span><span><strong>Shop with confidence</strong><small>A clear, simple experience</small></span></div>
          <div className="benefit-item"><span className="benefit-icon"><Icon name="refresh" size={21} /></span><span><strong>Easy to explore</strong><small>Find what you are looking for</small></span></div>
        </section>

        {categories.length > 0 && <section className="category-section page-container" id="categories">
          <div className="section-heading compact-heading"><div><span className="section-kicker">BROWSE YOUR WAY</span><h2>Explore categories</h2></div><Link className="text-link" to="/products">View all products <Icon name="arrow" size={16} /></Link></div>
          <div className="category-chips">{categories.map((category) => <Link key={category} to={`/products?category=${encodeURIComponent(category)}`} className="category-chip">{category}<Icon name="arrow" size={15} /></Link>)}</div>
        </section>}

        <section className="featured-section page-container" id="featured">
          <div className="section-heading"><div><span className="section-kicker">A GOOD PLACE TO START</span><h2>Explore our products</h2><p>Thoughtful picks for your everyday needs.</p></div><Link className="text-link" to="/products">Shop all <Icon name="arrow" size={16} /></Link></div>
          <ProductsGrid products={featuredProducts} loading={loading} error={error} emptyTitle="Your next great find starts here" emptyText="Products will appear here once your store API is connected." />
        </section>

        <section className="closing-banner page-container">
          <div><span className="section-kicker">SIMPLE SHOPPING STARTS HERE</span><h2>Find what fits your everyday.</h2><p>Browse the collection and make your next useful discovery.</p></div>
          <Link className="button button-light" to="/products">Browse the shop <Icon name="arrow" size={18} /></Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
