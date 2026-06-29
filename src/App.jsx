// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './features/auth/context/AuthContext';
import AppRoutes from './routes/AppRoutes';

/**
 * Global root entry point wrapping the application inside 
 * persistent Auth Context and React Router DOM providers.
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;