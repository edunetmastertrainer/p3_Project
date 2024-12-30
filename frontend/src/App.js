import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './Context';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';
import './App.css'; // Import the CSS file

function App() {
  const { token } = useContext(AuthContext);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/"
          element={token ? <Home /> : <Navigate to="/signup" />}
        />
        {/* <Route path='/' element={<Home/>}/> */}
      </Routes>
    </div>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
