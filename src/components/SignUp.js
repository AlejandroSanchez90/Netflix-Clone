import { useRef } from 'react';
import './SignUp.css';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import db from '../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function SignUp() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const auth = getAuth();
  const navigate = useNavigate();
  const register = (e) => {
    e.preventDefault();
    try {
      const register = async () => {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          emailRef.current.value,
          passwordRef.current.value
        );
      };

      toast.promise(register, {
        pending: 'Creating account',
        success: 'Success',
        error: 'Something went wrong',
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className='signup'>
      <form action=''>
        <h1>Sign In</h1>
        <input ref={emailRef} type='email' placeholder='Email' required />
        <input ref={passwordRef} type='password' placeholder='Password' required />
        <button onClick={signIn}>Sign In</button>
        <h4>
          <span className='signup__gray'>New to Netflix? </span>
          <span className='signup__link' onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignUp;
