import { useState } from 'react';
import { useRouter } from 'next/router';

export default function EmployeeLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you would normally validate credentials.
    router.push('/employee/dashboard');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Employee Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ margin: '5px', padding: '8px' }}
        /><br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ margin: '5px', padding: '8px' }}
        /><br/>
        <button type="submit" style={{ padding: '8px 16px' }}>Login</button>
      </form>
    </div>
  );
}
