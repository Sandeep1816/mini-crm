import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminLogin = (e) => {
    e.preventDefault();
    // Validate admin credentials as needed.
    router.push('/admin/employee-management');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Login</h1>
      <form onSubmit={handleAdminLogin}>
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
