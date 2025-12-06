// src/components/LoginPage.jsx
import { useState } from 'react';
import loginIllustration from '../assets/images/loginpage-illustration.JPG';

function LoginPage({ onBackClick, onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    if (!validateForm()) return;

    if (formData.username === 'admin' && formData.password === 'admin') {
      onLogin(formData);
    } else {
      setAuthError('Invalid credentials. Use username: admin and password: admin');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
    if (authError) setAuthError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-indigo-400 to-indigo-500 flex items-center justify-center px-4">
      {/* outer panel (bigger + hover zoom like hero) */}
      <div className="max-w-6xl w-full bg-white/90 rounded-[32px] shadow-[0_25px_80px_rgba(15,23,42,0.25)] overflow-hidden transform transition-transform transition-shadow duration-200 ease-out hover:scale-103 hover:shadow-[0_35px_100px_rgba(15,23,42,0.45)]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT: illustration fills entire side */}
        <div
        className="hidden md:block h-full w-full bg-no-repeat bg-center bg-cover"
        style={{
            backgroundImage: `url(${loginIllustration})`,
        }}
        ></div>
          {/* RIGHT: text + form */}
          <div className="px-10 py-10 sm:px-12 sm:py-12">
            <button
              onClick={onBackClick}
              className="text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors"
            >
              ← Back to Home
            </button>

            <p className="text-sm font-semibold tracking-wide text-indigo-500 mb-2">
              IMS · Inventory Management System
            </p>

            <h2 className="heading-font text-3xl sm:text-4xl font-semibold text-slate-900 mb-3">
              Welcome back
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Dummy login: <span className="font-mono text-slate-700">admin / admin</span>
            </p>

            {authError && (
              <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {authError}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.username ? 'border-red-500' : 'border-slate-200'
                  }`}
                  placeholder="admin"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.fullName ? 'border-red-500' : 'border-slate-200'
                  }`}
                  placeholder="Admin User"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.password ? 'border-red-500' : 'border-slate-200'
                  }`}
                  placeholder="admin"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="mt-3 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={!formData.username || !formData.fullName || !formData.password}
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;