import React from 'react';
import MovieSearch from './MovieSearch';
import PersonSearch from './PersonSearch';
import { useUser } from './usercontext';


function Dashboard(){
    const { user, token } = useUser();

    return (
        <>
        {user ? ( 
            <>
                <MovieSearch />
                <PersonSearch />
         </> ) : (
            <a href="/login">login</a>
         )}
      
        
        </>
          
    );
}

export default Dashboard;