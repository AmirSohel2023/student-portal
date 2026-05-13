import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, BookOpen, GraduationCap, Award, LogOut, User } from 'lucide-react';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-logo">Edu<span>Portal</span></div>

        <nav className="nav-section">
          <div className="nav-label">Main Menu</div>
          <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <LayoutDashboard /> Dashboard
          </NavLink>
          <NavLink to="/courses" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <BookOpen /> Browse Courses
          </NavLink>
          <NavLink to="/my-courses" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <GraduationCap /> My Courses
          </NavLink>
          <NavLink to="/certificates" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Award /> Certificates
          </NavLink>
        </nav>

        <div className="sidebar-bottom">
          <div className="nav-item" style={{ cursor: 'default', marginBottom: 8 }}>
            <User />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
                {user?.user?.first_name} {user?.user?.last_name}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Student</div>
            </div>
          </div>
          <button className="nav-item" onClick={handleLogout} style={{ color: 'var(--danger)' }}>
            <LogOut /> Logout
          </button>
        </div>
      </aside>
      <main className="main-content"><Outlet /></main>
    </div>
  );
}