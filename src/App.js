import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './pages/HomeScreen';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getAuth } from 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const user = null;

  useEffect(() => {
    const auth = getAuth();
    const userCredentials = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        console.log(userAuth);
      } else {
        //logged out
      }
    });

    return userCredentials;
  }, []);
  return (
    <div className='app'>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Routes>
            <Route path='/' element={<HomeScreen />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
