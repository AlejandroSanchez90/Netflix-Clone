import './Profile.css';
import Nav from '../components/Nav';
import Plans from '../components/Plans';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { getAuth } from 'firebase/auth';

function Profile() {
  const user = useSelector(selectUser);

  const signOutHandler = () => {
    const auth = getAuth();
    auth.signOut();
  };
  return (
    <div className='profile'>
      <Nav />
      <div className='profile__body'>
        <h1>Edit Profile</h1>
        <div className='profile__info'>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
            alt=''
          />

          <div className='profile_details'>
            <h2>{user.email}</h2>
            <div className='profile__plans'>
              <h3>Plans</h3>

              <Plans />
              <button className='profile__signOut' onClick={signOutHandler}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
