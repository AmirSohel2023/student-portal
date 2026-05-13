import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.username, form.password);
      toast.success('Welcome back!');
      navigate('/');
    } catch {
      toast.error('Invalid credentials');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">EduPortal</div>
        <p className="auth-subtitle">Your learning journey continues here</p>
        <h2>Sign In</h2>
        <p className="auth-subtitle" style={{ marginBottom: 24 }}>Enter your credentials to access your dashboard</p>
        <form onSubmit={handle}>
          <div className="form-group">
            <label>Username</label>
            <input value={form.username} onChange={e => setForm({...form, username: e.target.value})} placeholder="your_username" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="••••••••" required />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="auth-switch">Don't have an account? <Link to="/register">Create one</Link></div>
      </div>
    </div>
  );
}