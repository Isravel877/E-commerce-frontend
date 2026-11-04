import { useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../Components/Footer";
import Icon from "../Components/Icon";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    setMessage("The original project does not include a login API yet. Your details have not been sent or saved.");
  }
  return <><main className="page-container inner-page auth-page"><div className="auth-card"><div className="auth-mark"><Icon name="user" size={24} /></div><span className="section-kicker">WELCOME TO ISROZONE</span><h1>Welcome back</h1><p>Sign-in is ready for your account service to be connected.</p><form onSubmit={handleSubmit} className="auth-form"><label className="form-field"><span>Email address</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" placeholder="you@example.com" /></label><label className="form-field"><span>Password</span><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" placeholder="Enter your password" /></label><button className="button button-primary checkout-submit" type="submit">Sign in <Icon name="arrow" size={17} /></button>{message && <p className="inline-form-message" role="status">{message}</p>}</form><div className="auth-footnote"><Icon name="lock" size={15} /> Your account details are not transmitted by this preview.</div><p className="auth-switch">New to ISROZONE? <Link to="/register">Create an account</Link></p><Link to="/products" className="text-link">Continue browsing instead</Link></div></main><Footer /></>;
}
