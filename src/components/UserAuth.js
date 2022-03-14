import useState from 'react'
import SignUpModal from './SignUpModal';

function UserAuth({ user }) {

  //const [openSignUp, setOpenSignUp] = useState(false);

  function handleOpenSignUp(event) {
    event.preventDefault();
    //setOpenSignUp(true);
  };

  function handleOpenLogin() {

  };

  function handleLogout() {

  };

  return (
    <div className='userAuth'>

        {user ? (
            <button onClick={handleLogout}>Logout</button>
        ): (
            <div className='app__loginContainer'>
                <button onClick={handleOpenSignUp}>Sign Up</button> 
                <button onClick={handleOpenLogin}>Login</button>
            </div>
        )}

      <SignUpModal 
        // openSignUp={openSignUp}
      />      
    </div>
  )
}

export default UserAuth;