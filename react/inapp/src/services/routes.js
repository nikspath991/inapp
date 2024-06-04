import React from 'react';
import MovieSearch from '../components/MovieSearch';
import PersonSearch from '../components/PersonSearch';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Dashboard from '../pages/Dashboard';
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
