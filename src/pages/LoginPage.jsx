// frontend/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // UPDATED: Added Link import
import { useAuth } from '../features/auth/context/AuthContext';
import Input from '../shared/components/Input';
import Button from '../shared/components/Button';
import ErrorMessage from '../shared/components/ErrorMessage';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(credentials.email, credentials.password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid systemic credentials provided.');
      }
    } catch (err) {
      setError(err.message || 'Authentication handshake network fault.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <form onSubmit={handleFormSubmit} className="w-full max-w-md bg-slate-950 border border-slate-800 p-8 rounded-2xl space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-black text-white uppercase tracking-tight">Operations Portal Access</h2>
          <p className="text-xs text-slate-500 font-mono">Authorized Municipal Engineers Only</p>
        </div>

        {error && <ErrorMessage message={error} />}

        <div className="space-y-4">
          <Input label="Operational Email Address" name="email" type="email" placeholder="engineer@municipality.gov" value={credentials.email} onChange={handleChange} required />
          <Input label="Secure Security Key" name="password" type="password" placeholder="••••••••••••" value={credentials.password} onChange={handleChange} required />
        </div>

        <Button type="submit" disabled={loading} className="w-full justify-center">
          {loading ? 'Authenticating Matrix...' : 'Authenticate Matrix →'}
        </Button>

        {/* ADDED HERE: Registration link component for new visitors */}
        <p className="text-center text-xs text-slate-500 pt-2">
          First-time inspector?{' '}
          <Link to="/register" className="text-sky-400 font-bold hover:underline">
            Create an account
          </Link>
        </p>

      </form>
    </div>
  );
};

export default LoginPage;