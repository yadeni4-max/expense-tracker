import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
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
      await API.post('/auth/register', formData);

      alert('Registration successful');

      navigate('/');
    } catch (error) {
      console.log(error);
      alert('Registration failed');
    }
  };

  return (
    <div className="container">

      <div className="card">

        <h1>Register</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

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
            Register
          </button>

        </form>

        <br />

        <Link to="/">
          Already have an account? Login
        </Link>

      </div>

    </div>
  );
}

export default RegisterPage;