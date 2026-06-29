// frontend/src/features/auth/components/LoginForm.jsx
import React, { useState } from 'react';
import Input from '../../../shared/components/Input';
import Button from '../../../shared/components/Button';
import { validateEmail, validatePassword } from '../../../shared/utils/validators';

/**
 * Isolated login input form with client-side regex field validation execution loops
 */
const LoginForm = ({ onSubmit, isSubmitting, externalError }) => {
  const [fields, setFields] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!validateEmail(fields.email)) {
      validationErrors.email = 'Please provide a structurally valid municipal email array.';
    }
    if (!validatePassword(fields.password)) {
      validationErrors.password = 'Operational security keys must contain at least 6 tokens.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(fields);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-5">
      {externalError && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3.5 rounded-lg text-xs font-mono">
          ⚠️ Server Reject: {externalError}
        </div>
      )}

      <div className="space-y-4">
        <Input
          label="Operational Email Address"
          name="email"
          type="email"
          value={fields.email}
          onChange={handleInputChange}
          placeholder="engineer@municipality.gov"
          error={errors.email}
          required
        />

        <Input
          label="Secure Security Key"
          name="password"
          type="password"
          value={fields.password}
          onChange={handleInputChange}
          placeholder="••••••••••••"
          error={errors.password}
          required
        />
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full justify-center"
        >
          {isSubmitting ? 'Verifying Coordinates...' : 'Authenticate Matrix →'}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;