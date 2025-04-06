import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Popular categories for the dropdown
  const categories = [
    { id: 1, name: 'Technology', path: '/category/technology' },
    { id: 2, name: 'Lifestyle', path: '/category/lifestyle' },
    { id: 3, name: 'Travel', path: '/category/travel' },
    { id: 4, name: 'Food', path: '/category/food' },
    { id: 5, name: 'Health', path: '/category/health' },
    { id: 6, name: 'Business', path: '/category/business' },
  ];

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (token && user && user.username) {
      setIsLoggedIn(true);
      setUsername(user.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      setCategoryDropdownOpen(false); // Close dropdown when opening menu
    }
  };

  const toggleCategoryDropdown = (e) => {
    e.preventDefault();
    setCategoryDropdownOpen(!categoryDropdownOpen);
  };

  // Close dropdowns when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = () => {
      setCategoryDropdownOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
            <span className="logo-text">BlogHub</span>
          </Link>
        </div>
        
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search blogs"
            />
            <button type="submit" className="search-button" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>

        <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
        </button>

        <div className={`nav-actions ${menuOpen ? 'menu-open' : ''}`}>
          <div className="nav-links">
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
            
            <div className="category-dropdown" onClick={(e) => e.stopPropagation()}>
              <a href="#" className="nav-link dropdown-toggle" onClick={toggleCategoryDropdown}>
                Categories
                <svg className={`dropdown-icon ${categoryDropdownOpen ? 'open' : ''}`} width="10" height="6" viewBox="0 0 10 6">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              
              {categoryDropdownOpen && (
                <div className="dropdown-menu">
                  {categories.map(category => (
                    <Link 
                      key={category.id} 
                      to={category.path}
                      className="dropdown-item"
                      onClick={() => {
                        setCategoryDropdownOpen(false);
                        setMenuOpen(false);
                      }}
                    >
                      {category.name}
                    </Link>
                  ))}
                  <div className="dropdown-divider"></div>
                  <Link 
                    to="/categories" 
                    className="dropdown-item view-all"
                    onClick={() => {
                      setCategoryDropdownOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    View All Categories
                  </Link>
                </div>
              )}
            </div>
            
            <Link to="/trending" className="nav-link" onClick={() => setMenuOpen(false)}>Trending</Link>
            <ThemeToggle />
          </div>

          {isLoggedIn ? (
            <div className="user-info">
              <span className="username">{username}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
              <Link to="/create" className="start-blogging-btn accent-btn" onClick={() => setMenuOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Write a Blog
              </Link>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="auth-btn login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="auth-btn signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              <Link to="/login" className="start-blogging-btn accent-btn" onClick={() => setMenuOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Start Blogging
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
