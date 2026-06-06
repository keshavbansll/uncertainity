import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Activity } from 'lucide-react';
import '../styles/layout.css';

export const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="sidebar-brand">Uncertainty.</div>
        
        <nav className="sidebar-nav">
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink 
            to="/reflection" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <CheckSquare size={20} />
            <span>Daily Reflection</span>
          </NavLink>
          <NavLink 
            to="/timeline" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Activity size={20} />
            <span>Timeline</span>
          </NavLink>
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};
