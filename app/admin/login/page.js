'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    const adminToken = process.env.NEXT_PUBLIC_ADMIN_TOKEN;

    if (password === adminPassword) {
      document.cookie = `admin-token=${adminToken}; path=/`;
      router.push('/admin/properties'); // Redirect to properties page
    } else {
      setError('Invalid password. ONLY Admin can acces!');
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-16">
      <div className="card w-full max-w-md p-8">
        <h1 className="page-title text-center mb-8">Admin Login</h1>
        {error && <div className="alert-error mb-4">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          <button
            type="submit"
            className="btn-primary w-full py-3"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
