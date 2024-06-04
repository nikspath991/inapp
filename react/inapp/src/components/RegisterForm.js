import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/Api';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = api.registeruser(username,password)
      
      const data = response.data;
      console.log(data);
      setUsername('');
      setPassword('');
      setError(null);
      navigate("/login")
    } catch (error) {
      console.error('Error:', error.response);
      setError('Registration failed');
    }
  };

  return (

    <div className='container'>

{error && (<div className="alert alert-danger" role="alert">
  {error}
</div>)}

<form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label for="username" className="form-label">Username</label>
    <input type="text" className="form-control" id="username" value={username}
          onChange={(e) => setUsername(e.target.value)}
          required></input>
  </div>
  <div className="mb-3">
    <label for="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password"  value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>



   
  );
}

export default RegisterForm;
