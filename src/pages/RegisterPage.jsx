// frontend/src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';
import Input from '../shared/components/Input';
import Button from '../shared/components/Button';
import ErrorMessage from '../shared/components/ErrorMessage';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [fields, setFields] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (fields.password !== fields.confirmPassword) {
      return setError('Security signatures do not match.');
    }

    setLoading(true);
    try {
      const success = await register(fields.email, fields.password);
      if (success) {
        // Send them straight to login upon database insertion success
        navigate('/login');
      }
    } catch (err) {
      setError(err.message || 'Database registration conflict occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <form onSubmit={handleRegisterSubmit} className="w-full max-w-md bg-slate-950 border border-slate-800 p-8 rounded-2xl space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-black text-white uppercase tracking-tight">Create Operations Account</h2>
          <p className="text-xs text-slate-500 font-mono">Register fresh municipal system coordinates</p>
        </div>

        {error && <ErrorMessage message={error} />}

        <div className="space-y-4">
          <Input label="Operational Email Address" name="email" type="email" placeholder="name@municipality.gov" value={fields.email} onChange={handleChange} required />
          <Input label="Establish Security Key" name="password" type="password" placeholder="••••••••" value={fields.password} onChange={handleChange} required />
          <Input label="Confirm Security Key" name="confirmPassword" type="password" placeholder="••••••••" value={fields.confirmPassword} onChange={handleChange} required />
        </div>

        <Button type="submit" disabled={loading} className="w-full justify-center">
          {loading ? 'Writing to Ledger...' : 'Commit Operational Registration'}
        </Button>

        <p className="text-center text-xs text-slate-500">
          Already cataloged?{' '}
          <Link to="/login" className="text-sky-400 font-bold hover:underline">
            Authenticate here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;