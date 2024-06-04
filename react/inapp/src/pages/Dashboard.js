import React from 'react';
import MovieSearch from '../components/MovieSearch';
import PersonSearch from '../components/PersonSearch';
import { useUser } from '../hooks/usercontext';
import Header from '../components/Header';


function Dashboard(){
    const { user } = useUser();

    return (
        <>
        {user ? ( 
            <>
                <Header />
                <MovieSearch />
                <PersonSearch />
         </> ) : (
            <a href="/login">login</a>
         )}
      
        
        </>
          
    );
}

export default Dashboard;