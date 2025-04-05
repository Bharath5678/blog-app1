import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
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
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
            <span className="logo-text">Blog<span className="highlight">Hub</span></span>
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
            />
            <button type="submit" className="search-button">
              <i className="search-icon">🔍</i>
            </button>
          </form>
        </div>

        <div className="nav-actions">
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/categories" className="nav-link">Categories</Link>
            <Link to="/trending" className="nav-link">Trending</Link>
            <ThemeToggle />
          </div>

          {isLoggedIn ? (
            <div className="user-info">
              <span className="username">{username}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
              <Link to="/create" className="start-blogging-btn">Write a Blog</Link>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="auth-btn login">Login</Link>
              <Link to="/signup" className="auth-btn signup">Sign Up</Link>
              <Link to="/login" className="start-blogging-btn">Start Blogging</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
