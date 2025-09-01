import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      setMessage(data.message);
      setIsSuccess(data.success);
      
      if (data.success) {
        setMessage(`${data.message} Token: ${data.token}`);
      }
    } catch (error) {
      setMessage('Connection error');
      setIsSuccess(false);
    }
  };

  return (
    <div className="container">
      <h1>Simple Login</h1>
      
      <div className="demo-info">
        <strong>Demo Credentials:</strong><br/>
        admin/password or demo/demo
      </div>

      {message && (
        <div className={`message ${isSuccess ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <div className="demo-info" style={{marginTop: '20px'}}>
        🔍 OpenTelemetry traces are being generated!<br/>
        Check Jaeger UI at <a href="http://localhost:16686" target="_blank" rel="noreferrer">localhost:16686</a>
      </div>
    </div>
  );
}

export default App;
