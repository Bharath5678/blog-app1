import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './BlogList.css'; // Reuse the same styling as BlogList

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query, currentPage]);

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      // Replace with your actual search endpoint
      const response = await axios.get(`http://localhost:8000/api/blogs/search/?q=${encodeURIComponent(query)}&page=${currentPage}`);
      
      // For now, we'll simulate search by filtering client-side
      // In a real application, you would implement server-side search
      const allBlogsResponse = await axios.get(`http://localhost:8000/api/blogs/?page=${currentPage}`);
      const filteredResults = allBlogsResponse.data.results.filter(blog => 
        blog.title.toLowerCase().includes(query.toLowerCase()) || 
        blog.content.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults(filteredResults);
      setTotalPages(Math.max(1, Math.ceil(filteredResults.length / 6)));
      setLoading(false);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to perform search. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Searching...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="blog-list-container fade-in">
      <div className="blog-list-header">
        <h1>Search Results for "{query}"</h1>
        <p>{results.length} results found</p>
      </div>

      {results.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No results found</h3>
          <p>We couldn't find any blogs matching your search query.</p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      ) : (
        <>
          <div className="blog-grid">
            {results.map(blog => (
              <div key={blog.id} className="blog-card">
                <div className="blog-content">
                  <h2 className="blog-title">
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </h2>
                  <div className="blog-meta">
                    <div className="blog-author">
                      <span className="author-icon">👤</span> 
                      {blog.author.username}
                    </div>
                    <div className="blog-date">
                      <span className="date-icon">📅</span> 
                      {new Date(blog.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="blog-excerpt">
                    {blog.content.substring(0, 150)}
                    {blog.content.length > 150 ? '...' : ''}
                  </p>
                  <Link to={`/blogs/${blog.id}`} className="read-more">
                    Read More <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <div className="page-indicator">
                Page {currentPage} of {totalPages}
              </div>
              <button 
                className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SearchResults; 