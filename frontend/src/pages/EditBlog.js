import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api';

function EditBlog() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    fetchBlog();
  }, [id, navigate]);
  
  const fetchBlog = async () => {
    try {
      setLoading(true);
      const res = await API.get(`blogs/${id}/`);
      setTitle(res.data.title);
      setContent(res.data.content);
      setError('');
    } catch (err) {
      console.error("Error fetching blog:", err);
      setError("Failed to load blog post");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }
    
    try {
      setSaving(true);
      setError('');
      await API.put(`blogs/${id}/`, { title, content });
      navigate(`/blogs/${id}`);
    } catch (err) {
      console.error('Error updating blog:', err);
      setError('Failed to update blog post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to={`/blogs/${id}`} style={{ textDecoration: 'none', color: '#555' }}>
          &larr; Back to blog post
        </Link>
      </div>
      
      <div style={{ 
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
      }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Edit Blog Post</h2>
        
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
        
        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="title" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Title
            </label>
            <input 
              id="title"
              value={title} 
              onChange={e => setTitle(e.target.value)} 
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
          
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <Link 
              to={`/blogs/${id}`}
              style={{
                padding: '12px 20px',
                backgroundColor: '#f5f5f5',
                color: '#333',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                textAlign: 'center'
              }}
            >
              Cancel
            </Link>
            
            <button 
              type="submit" 
              disabled={saving}
              style={{
                backgroundColor: '#4285f4',
                color: 'white',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '4px',
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.7 : 1,
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBlog;
