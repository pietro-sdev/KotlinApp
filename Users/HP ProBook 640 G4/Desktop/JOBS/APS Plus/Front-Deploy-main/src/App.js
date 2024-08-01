import React from 'react'
import './App.css';
import RoutesComponent from './routes'
import { UserContextProvider } from './context/user.js';

function App() {
  return (
    <React.StrictMode>
      <UserContextProvider >
          <RoutesComponent/>
      </UserContextProvider >
    </React.StrictMode>
  );
}

export default App;

