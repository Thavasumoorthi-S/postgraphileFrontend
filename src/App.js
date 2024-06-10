import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import Signup from './Components/Signup';
import Customer from './Components/Customer';
import Signin from './Components/Signin';
import Verify from './Components/Verify';
import Resendotp from './Components/Resendotp';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
          <Route exact path="/" element={<Signup/>} />
          <Route exact path="/customer" element={<Customer/>} />
          <Route exact path="/signin" element={<Signin/>} />
          <Route exact path="/Verify" element={<Verify/>} />
          <Route exact path="/resendotp" element={<Resendotp/>} />

           </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
