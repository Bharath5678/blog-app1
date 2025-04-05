import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home() {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [categories, setCategories] = useState([
    { 
      id: 1, 
      name: 'Technology', 
      icon: '💻', 
      count: 12,
      description: 'Explore the latest in tech trends, software development, AI, and digital innovations.'
    },
    { 
      id: 2, 
      name: 'Lifestyle', 
      icon: '🌿', 
      count: 8,
      description: 'Articles about personal development, wellness, relationships, and balanced living.'
    },
    { 
      id: 3, 
      name: 'Travel', 
      icon: '✈️', 
      count: 15,
      description: 'Journey to exotic destinations, travel tips, adventure stories, and cultural experiences.'
    },
    { 
      id: 4, 
      name: 'Food', 
      icon: '🍜', 
      count: 10,
      description: 'Delicious recipes, culinary adventures, restaurant reviews, and cooking techniques.'
    },
    { 
      id: 5, 
      name: 'Business', 
      icon: '💼', 
      count: 7,
      description: 'Insights on entrepreneurship, marketing strategies, career growth, and financial wisdom.'
    },
    { 
      id: 6, 
      name: 'Health', 
      icon: '🏥', 
      count: 9,
      description: 'Tips for physical fitness, mental wellbeing, nutrition advice, and medical insights.'
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedBlogs();
  }, []);

  const fetchFeaturedBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/blogs/');
      
      // For demo purposes, we'll just use the most recent blogs as featured
      const allBlogs = response.data.results;
      setFeaturedBlogs(allBlogs.slice(0, 3));
      
      // For trending, we'd normally have a different endpoint, but for demo:
      setTrendingBlogs(allBlogs.slice(3, 9));
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to fetch blogs. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading amazing content...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Discover Stories, Ideas, and Expertise</h1>
          <p className="hero-subtitle">
            Join our community of passionate bloggers and readers.
            Start your journey today with BlogHub.
          </p>
          <div className="hero-buttons">
            <Link to="/create" className="hero-button primary">Start Blogging</Link>
            <Link to="/categories" className="hero-button secondary">Explore Categories</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3" alt="Blog writing" />
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Blogs</h2>
          <Link to="/" className="view-all">View All</Link>
        </div>
        <div className="featured-blogs">
          {featuredBlogs.map(blog => (
            <div key={blog.id} className="featured-blog-card">
              <div className="featured-blog-image">
                {/* This would normally be the blog's featured image */}
                <div className="image-placeholder" style={{ backgroundColor: getRandomColor() }}></div>
                <div className="featured-tag">Featured</div>
              </div>
              <div className="featured-blog-content">
                <h3 className="featured-blog-title">
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </h3>
                <div className="featured-blog-meta">
                  <span className="featured-blog-author">By {blog.author.username}</span>
                  <span className="featured-blog-date">{new Date(blog.created_at).toLocaleDateString()}</span>
                </div>
                <p className="featured-blog-excerpt">
                  {blog.content.substring(0, 120)}...
                </p>
                <Link to={`/blogs/${blog.id}`} className="read-more-link">
                  Read Full Article <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2>Popular Categories</h2>
          <Link to="/categories" className="view-all">View All</Link>
        </div>
        <div className="categories-grid">
          {categories.map(category => (
            <Link to={`/category/${category.id}`} key={category.id} className="category-card">
              <div className="category-icon">{category.icon}</div>
              <div className="category-info">
                <h3>{category.name}</h3>
                <p className="category-description">{category.description}</p>
                <span className="category-count">{category.count} Posts</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="trending-section">
        <div className="section-header">
          <h2>Trending Now</h2>
          <Link to="/trending" className="view-all">View All</Link>
        </div>
        <div className="trending-blogs">
          {trendingBlogs.map(blog => (
            <div key={blog.id} className="trending-blog-card">
              <div className="trending-number">{trendingBlogs.indexOf(blog) + 1}</div>
              <div className="trending-blog-content">
                <Link to={`/blogs/${blog.id}`} className="trending-blog-title">
                  {blog.title}
                </Link>
                <div className="trending-blog-meta">
                  <span className="trending-blog-author">{blog.author.username}</span>
                  <span className="trending-dot">•</span>
                  <span className="trending-blog-date">{new Date(blog.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to share your story?</h2>
          <p className="cta-description">
            Join thousands of writers who have already started their blogging journey.
            It's free, easy, and takes less than a minute to get started.
          </p>
          <Link to="/create" className="cta-button">Start Writing Today</Link>
        </div>
      </section>
    </div>
  );
}

// Helper function to generate random colors for featured blog images
function getRandomColor() {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFBE0B', 
    '#FB5607', '#8338EC', '#3A86FF', '#06D6A0'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default Home; 