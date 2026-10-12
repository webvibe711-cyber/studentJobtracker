import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/jobs', label: 'Jobs' },
  { to: '/login', label: 'Student Login' },
  { to: '/add-application', label: 'Add Application' },
  { to: '/applications', label: 'Applications' },
];

export default function Navbar({ applicationCount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="navbar-wrap">
        <NavLink className="brand" to="/" onClick={() => setMenuOpen(false)} aria-label="Job Tracker home">
          <span className="brand-mark" aria-hidden="true">JT</span>
          <span>Job Tracker</span>
        </NavLink>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
        <nav id="primary-navigation" className={`primary-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
              {link.to === '/applications' && applicationCount > 0 && (
                <span className="nav-count">{applicationCount}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}