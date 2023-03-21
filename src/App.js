import React from 'react';
import './App.css';
import HomeScreen from './pages/HomeScreen';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/test' element={<h1>WHATS UP</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
