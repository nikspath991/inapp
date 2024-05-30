import React from 'react';
import MovieSearch from './MovieSearch';
import PersonSearch from './PersonSearch';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Routes,Route, Outlet, } from 'react-router-dom';

function RouteList() {
    return (
      
        <Router>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/register" element={<RegisterForm/>} />
            <Route path="/movie" element={<MovieSearch/>} />
            <Route path="/person" element={<PersonSearch />}/>
          </Routes>
          </Router>

     
      
        
    );
}

export default RouteList;
