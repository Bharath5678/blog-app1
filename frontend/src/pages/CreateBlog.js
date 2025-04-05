import React, { useState, useEffect } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if user is logged in, redirect to login if not
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Check for token before submitting
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to create a blog post');
        navigate('/login');
        return;
      }
      
      console.log('Creating blog with token:', token);
      const response = await API.post('blogs/', { title, content });
      console.log('Blog created successfully:', response.data);
      navigate('/');
    } catch (err) {
      console.error('Error creating blog:', err);
      if (err.response?.status === 401) {
        setError('Authentication failed. Please log in again.');
        localStorage.removeItem('token');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(`Failed to create blog post: ${err.response?.data?.detail || err.message || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#555' }}>
          &larr; Back to all blogs
        </Link>
      </div>
      
      <div style={{ 
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
      }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Create New Blog Post</h2>
        
        {error && (
          <div style={{ 
            backgroundColor: '#ffebee', 
            color: '#c62828', 
            padding: '10px', 
            borderRadius: '4px', 
            marginBottom: '20px' 
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="title" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Title
            </label>
            <input 
              id="title"
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="Enter blog title" 
              style={{ 
                width: '100%', 
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem'
              }}
              required
            />
          </div>
          
          <div>
            <label htmlFor="content" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Content
            </label>
            <textarea 
              id="content"
              value={content} 
              onChange={e => setContent(e.target.value)} 
              placeholder="Write your blog post here..." 
              style={{ 
                width: '100%', 
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                minHeight: '300px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                lineHeight: '1.5'
              }}
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            style={{
              backgroundColor: '#4285f4',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            {loading ? 'Publishing...' : 'Publish Blog Post'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
