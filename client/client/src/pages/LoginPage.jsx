import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post('/api/auth/login', formData);

      localStorage.setItem('token', response.data.token);

      alert('Login successful');

      navigate('/dashboard');

    } catch (error) {
      console.log(error);
      alert('Login failed');
    }
  };

  return (
    <div className="container">

      <div className="card">

        <h1>Login</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">
            Login
          </button>

        </form>

        <br />

        <Link to="/register">
          Don't have an account? Register
        </Link>

      </div>

    </div>
  );
}

export default LoginPage;