import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api';
import './BlogDetail.css';

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const res = await API.get(`blogs/${id}/`);
      setBlog(res.data);
    } catch (err) {
      console.error("Error fetching blog:", err);
      setError("Failed to load blog post");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    try {
      await API.delete(`blogs/${id}/`);
      navigate('/');
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("Failed to delete blog post");
    }
  };

  if (loading) return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Loading blog post...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <div className="error-icon">!</div>
      <h3>Oops! Something went wrong</h3>
      <p>{error}</p>
      <button onClick={fetchBlog} className="btn btn-primary">Try Again</button>
    </div>
  );

  if (!blog) return (
    <div className="not-found-container">
      <div className="not-found-icon">🔍</div>
      <h3>Blog post not found</h3>
      <p>The blog post you're looking for doesn't exist or has been removed.</p>
      <Link to="/" className="btn btn-primary">Back to Blogs</Link>
    </div>
  );

  // Check if the current user is the author
  const isLoggedIn = localStorage.getItem('token');

  return (
    <div className="blog-detail-container fade-in">
      <div className="blog-detail-header">
        <Link to="/" className="back-link">
          <span>&larr;</span> Back to all blogs
        </Link>
      </div>

      <article className="blog-detail-content">
        <h1 className="blog-detail-title">{blog.title}</h1>

        <div className="blog-detail-meta">
          <div className="author-info">
            <div className="author-avatar">{blog.author ? blog.author.charAt(0).toUpperCase() : 'U'}</div>
            <div>
              <div className="author-name">{blog.author}</div>
              <div className="publish-date">
                {new Date(blog.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>

          {isLoggedIn && (
            <div className="blog-actions">
              <Link to={`/edit/${blog.id}`} className="edit-btn">
                <span className="icon">✏️</span> Edit
              </Link>
              <button onClick={handleDelete} className="delete-btn">
                <span className="icon">🗑️</span> Delete
              </button>
            </div>
          )}
        </div>

        <div className="blog-content">
          {blog.content.split('\n').map((paragraph, index) => (
            paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
          ))}
        </div>
      </article>

      <div className="share-section">
        <h3>Enjoyed this article? Share it!</h3>
        <div className="share-buttons">
          <button className="share-btn facebook">
            <span>Facebook</span>
          </button>
          <button className="share-btn twitter">
            <span>Twitter</span>
          </button>
          <button className="share-btn linkedin">
            <span>LinkedIn</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
