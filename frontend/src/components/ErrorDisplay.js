import React from 'react';

/**
 * A component to display error messages when API calls fail
 */
const ErrorDisplay = ({ 
  message = "Failed to fetch data from the server", 
  details = "There was a problem connecting to the server. Please check your internet connection or try again later.",
  onRetry = null
}) => {
  return (
    <div className="fetch-error">
      <h3>{message}</h3>
      <p>{details}</p>
      {onRetry && (
        <button 
          className="retry-button"
          onClick={onRetry}
          aria-label="Retry fetching data"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay; 