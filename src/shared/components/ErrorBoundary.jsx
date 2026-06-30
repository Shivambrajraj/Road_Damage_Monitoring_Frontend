// frontend/src/shared/components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Still logs to console for debugging, but no longer leaves a blank page
    console.error('Caught a render error:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
          <div className="max-w-md text-center space-y-4">
            <h1 className="text-xl font-black text-white uppercase tracking-tight">
              Something went wrong
            </h1>
            <p className="text-xs text-slate-500 font-mono">
              The page hit an unexpected error and couldn't render. Try going back to the homepage.
            </p>
            <button
              onClick={this.handleReset}
              className="bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;