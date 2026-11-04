import { useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../Components/Footer";
import Icon from "../Components/Icon";

export default function Register() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  function handleSubmit(event) {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMessage("Your passwords do not match. Please check and try again.");
      return;
    }
    setMessage("The original project does not include a registration API yet. Your details have not been sent or saved.");
  }

  return <><main className="page-container inner-page auth-page"><div className="auth-card"><div className="auth-mark"><Icon name="user" size={24} /></div><span className="section-kicker">JOIN ISROZONE</span><h1>Create your account</h1><p>Set up an account experience that is simple and clear.</p><form onSubmit={handleSubmit} className="auth-form"><label className="form-field"><span>Full name</span><input name="fullName" value={form.fullName} onChange={update} required autoComplete="name" placeholder="Your name" /></label><label className="form-field"><span>Email address</span><input name="email" type="email" value={form.email} onChange={update} required autoComplete="email" placeholder="you@example.com" /></label><label className="form-field"><span>Password</span><input name="password" type="password" value={form.password} onChange={update} required minLength={8} autoComplete="new-password" placeholder="At least 8 characters" /></label><label className="form-field"><span>Confirm password</span><input name="confirmPassword" type="password" value={form.confirmPassword} onChange={update} required minLength={8} autoComplete="new-password" placeholder="Enter your password again" /></label><button className="button button-primary checkout-submit" type="submit">Create account <Icon name="arrow" size={17} /></button>{message && <p className="inline-form-message" role="status">{message}</p>}</form><div className="auth-footnote"><Icon name="lock" size={15} /> This preview does not transmit or save account credentials.</div><p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p></div></main><Footer /></>;
}
