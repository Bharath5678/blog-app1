import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';
import './BlogList.css';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await API.get('blogs/', { params: { page } });
      setBlogs(res.data.results || res.data);
      setHasMore(res.data.next !== null);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch blogs');
      setLoading(false);
      console.error(err);
    }
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
    fetchBlogs();
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
      fetchBlogs();
    }
  };

  if (loading && blogs.length === 0) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading amazing blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">!</div>
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button onClick={fetchBlogs} className="btn btn-primary">Try Again</button>
      </div>
    );
  }

  return (
    <div className="blog-list-container fade-in">
      <div className="blog-list-header">
        <h1>Explore Blogs</h1>
        <p>Discover interesting stories and insights</p>

        {localStorage.getItem('token') && (
          <Link to="/create" className="create-blog-btn">
            <span>+</span> Create New Blog
          </Link>
        )}
      </div>

      {blogs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No blogs found</h3>
          <p>Be the first to create a blog post!</p>
          {localStorage.getItem('token') ? (
            <Link to="/create" className="btn btn-primary">Create Blog</Link>
          ) : (
            <Link to="/login" className="btn btn-primary">Login to Create</Link>
          )}
        </div>
      ) : (
        <div className="blog-grid">
          {blogs.map(blog => (
            <div key={blog.id} className="blog-card">
              <div className="blog-card-content">
                <h2 className="blog-title">
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </h2>
                <div className="blog-meta">
                  <div className="blog-author">
                    <span className="author-icon">👤</span> {blog.author}
                  </div>
                  <div className="blog-date">
                    <span className="date-icon">📅</span> {new Date(blog.created_at).toLocaleDateString()}
                  </div>
                </div>
                <p className="blog-excerpt">{blog.content.substring(0, 150)}...</p>
                <Link to={`/blogs/${blog.id}`} className="read-more">
                  Read More <span>&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {blogs.length > 0 && (
        <div className="pagination">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className={`pagination-btn prev ${page === 1 ? 'disabled' : ''}`}
          >
            &larr; Previous
          </button>
          <span className="page-indicator">Page {page}</span>
          <button
            onClick={handleNextPage}
            disabled={!hasMore}
            className={`pagination-btn next ${!hasMore ? 'disabled' : ''}`}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogList;
