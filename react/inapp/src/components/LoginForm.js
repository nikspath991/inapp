import React, { useState } from 'react';
import { useUser } from '../hooks/usercontext';
import { useNavigate } from 'react-router-dom';
import api from '../services/Api';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    
    try {
      const data = await api.loginuser(formData);
      login(username, data.access_token)
      console.log(data);
      
      setUsername('');
      setPassword('');
      setError(null);
      navigate('/');
    } catch (error) {
      console.error('Error:', error.response);
      setError('Incorrect username or password');
    }
  };

  return (


<div className='container'>
{error? (<div class="alert alert-danger" role="alert">
  {error}
</div>):""}
 

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
  <a href="/register">Register</a>
</form>
</div>

 




    
  );
}

export default LoginForm;
