import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./Components/Header";
import { ShopProvider, useShop } from "./context/ShopContext";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import Checkout from "./Pages/Checkout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import OrderConfirmation from "./Pages/OrderConfirmation";
import Orders from "./Pages/Orders";
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function ToastNotice() {
  const { notice } = useShop();
  return notice ? <div className="toast-notice" role="status"><span className="toast-check">✓</span>{notice}</div> : null;
}

function AppShell() {
  return <>
    <ScrollToTop />
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="*" element={<main className="page-container inner-page"><div className="state-panel"><h1>Page not found</h1><p>The page you're looking for doesn't exist.</p><a className="button button-primary" href="/">Return home</a></div></main>} />
    </Routes>
    <ToastNotice />
  </>;
}

function App() {
  return <BrowserRouter><ShopProvider><AppShell /></ShopProvider></BrowserRouter>;
}

export default App;
