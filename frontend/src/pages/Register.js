import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ username:'', email:'', first_name:'', last_name:'', password:'' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      await register(form);
      toast.success('Account created! Welcome aboard 🎉');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.username?.[0] || 'Registration failed');
    } finally { setLoading(false); }
  };

  const set = (k) => (e) => setForm({...form, [k]: e.target.value});

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">EduPortal</div>
        <h2>Create Account</h2>
        <p className="auth-subtitle" style={{ marginBottom: 24 }}>Join thousands of students learning online</p>
        <form onSubmit={handle}>
          <div className="form-row">
            <div className="form-group"><label>First Name</label><input value={form.first_name} onChange={set('first_name')} placeholder="John" required /></div>
            <div className="form-group"><label>Last Name</label><input value={form.last_name} onChange={set('last_name')} placeholder="Doe" required /></div>
          </div>
          <div className="form-group"><label>Username</label><input value={form.username} onChange={set('username')} placeholder="johndoe" required /></div>
          <div className="form-group"><label>Email</label><input type="email" value={form.email} onChange={set('email')} placeholder="john@email.com" required /></div>
          <div className="form-group"><label>Password</label><input type="password" value={form.password} onChange={set('password')} placeholder="Min. 6 characters" required minLength={6} /></div>
          <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Creating account...' : 'Create Account'}</button>
        </form>
        <div className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></div>
      </div>
    </div>
  );
}