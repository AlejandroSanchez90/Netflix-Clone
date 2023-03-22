import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './pages/HomeScreen';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getAuth } from 'firebase/auth';
import { login, logout, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const userCredentials = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(login({ uid: userAuth.uid, email: userAuth.email }));
      } else {
        dispatch(logout());
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
            <Route path='/profile' element={<Profile />} />
            <Route path='/' element={<HomeScreen />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
