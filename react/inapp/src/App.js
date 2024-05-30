import React from 'react';
import RouteList from './components/routes';
import {UserProvider} from './components/usercontext';


function App() {
    return (
      <UserProvider>
          <RouteList/>
      </UserProvider>
              
    );
}

export default App;
