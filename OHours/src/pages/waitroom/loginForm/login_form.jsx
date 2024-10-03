import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (username.length < 3 || password.length < 6) {
      setError('Username must be at least 3 characters and password at least 6 characters long.');
    } else {
      console.log('Login attempt', { username, password });
      alert('Login form submitted');
    }
  };

  return (
    <div className="login-container">
      <h2>Peer Mentor Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;