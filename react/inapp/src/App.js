import React from 'react';
import RouteList from './services/routes';
import {UserProvider} from './hooks/usercontext';


function App() {
    return (
      <UserProvider>
          <RouteList/>
      </UserProvider>
              
    );
}

export default App;
