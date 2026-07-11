// frontend/src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';
import Input from '../shared/components/Input';
import Button from '../shared/components/Button';
import ErrorMessage from '../shared/components/ErrorMessage';

// Three-step registration: (1) enter email+password -> send OTP,
// (2) enter the 6-digit code emailed to them -> verify,
// (3) account gets created automatically once verified.
const STEP_DETAILS = 1;
const STEP_OTP = 2;

const RegisterPage = () => {
  const navigate = useNavigate();
  const { sendOtp, verifyOtp, register } = useAuth();

  const [step, setStep] = useState(STEP_DETAILS);
  const [fields, setFields] = useState({ email: '', password: '', confirmPassword: '' });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const startCooldown = () => {
    setResendCooldown(30);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');

    if (fields.password !== fields.confirmPassword) {
      return setError('Security signatures do not match.');
    }
    if (fields.password.length < 6) {
      return setError('Security key must be at least 6 characters.');
    }

    setLoading(true);
    try {
      await sendOtp(fields.email);
      setInfo(`We emailed a 6-digit code to ${fields.email}. It expires in 10 minutes.`);
      setStep(STEP_OTP);
      startCooldown();
    } catch (err) {
      setError(err.message || 'Could not send the verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setError('');
    setLoading(true);
    try {
      await sendOtp(fields.email);
      setInfo('A new code was sent.');
      startCooldown();
    } catch (err) {
      setError(err.message || 'Could not resend the code.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const verificationToken = await verifyOtp(fields.email, otp);
      await register(fields.email, fields.password, verificationToken);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <form
        onSubmit={step === STEP_DETAILS ? handleSendOtp : handleVerifyAndRegister}
        className="w-full max-w-md bg-slate-950 border border-slate-800 p-8 rounded-2xl space-y-6"
      >
        <div className="text-center space-y-1">
          <h2 className="text-xl font-black text-white uppercase tracking-tight">
            {step === STEP_DETAILS ? 'Create Operations Account' : 'Verify Your Email'}
          </h2>
          <p className="text-xs text-slate-500 font-mono">
            {step === STEP_DETAILS
              ? 'Register fresh municipal system coordinates'
              : `Enter the code sent to ${fields.email}`}
          </p>
        </div>

        {error && <ErrorMessage message={error} />}
        {info && !error && (
          <div className="bg-sky-500/10 border border-sky-500/20 text-sky-300 p-3 rounded-lg text-xs font-mono">
            ✓ {info}
          </div>
        )}

        {step === STEP_DETAILS ? (
          <div className="space-y-4">
            <Input
              label="Operational Email Address"
              name="email"
              type="email"
              placeholder="name@municipality.gov"
              value={fields.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Establish Security Key"
              name="password"
              type="password"
              placeholder="••••••••"
              value={fields.password}
              onChange={handleChange}
              required
            />
            <Input
              label="Confirm Security Key"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={fields.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              label="6-Digit Verification Code"
              name="otp"
              type="text"
              placeholder="••••••"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              required
            />
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendCooldown > 0 || loading}
              className="text-[11px] font-bold text-sky-400 hover:underline disabled:text-slate-600 disabled:no-underline cursor-pointer disabled:cursor-not-allowed"
            >
              {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend code'}
            </button>
          </div>
        )}

        <Button type="submit" disabled={loading || (step === STEP_OTP && otp.length !== 6)} className="w-full justify-center">
          {loading
            ? 'Processing...'
            : step === STEP_DETAILS
            ? 'Send Verification Code'
            : 'Verify & Create Account'}
        </Button>

        {step === STEP_OTP && (
          <button
            type="button"
            onClick={() => { setStep(STEP_DETAILS); setError(''); setInfo(''); }}
            className="w-full text-center text-[11px] text-slate-500 hover:text-slate-300 cursor-pointer"
          >
            ← Edit email or password
          </button>
        )}

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