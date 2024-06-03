import React from 'react';
import MovieSearch from './MovieSearch';
import PersonSearch from './PersonSearch';
import { useUser } from './usercontext';
import Header from './Header';


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