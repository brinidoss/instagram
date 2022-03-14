import { useState, useEffect } from 'react'
import SignUpModal from './SignUpModal';
import Modal from "@mui/material/Modal";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//import Input from '@material-ui/core';
import { signUp, updateUser, login, logout } from "../firebase";
import '../styles/UserAuth.css';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase';


function UserAuth({ user }) {

  const [openSignUp, setOpenSignUp] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const handleCloseSignUp = () => setOpenSignUp(false);
  const handleCloseLogin = () => setOpenLogin(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [existPassword, setExistPassword] = useState('');
  const [existEmail, setExistEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect( () => {
    auth.currentUser ? setLoggedIn(true) : setLoggedIn(false);
  }, []);

  function handleOpenSignUp(event) {
    event.preventDefault();
    setOpenSignUp(true);
  };

  function handleOpenLogin(event) {
    event.preventDefault();
    setOpenLogin(true);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    signUp(newEmail, newPassword, newUsername);
    console.log(auth.currentUser);
    updateUser(newUsername);
    setOpenSignUp(false);
    setLoggedIn(true);
  }

  const handleLogin = (event) => {
    event.preventDefault();
    login(existEmail, existPassword);
    setOpenLogin(false);
    setLoggedIn(null);
    setLoggedIn(true);
  }

  function handleLogout(event) {
    event.preventDefault();
    logout();
    setLoggedIn(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  console.log(user);

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

<Modal
          open={openSignUp}
          onClose={handleCloseSignUp}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                <form className='app__signup'>
                  <img
                      className="app__headerImage"
                      src="https://i.pinimg.com/originals/14/e2/d4/14e2d4c02ecab741f68b1cb94571ba24.jpg"
                      alt="instagram logo"
                   />
  
  
                  <input
                      placeholder="username"
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                  />
             
                  <input
                      placeholder="email"
                      type="text"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                  />
        
                  <input
                      placeholder='password'
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                  />
  
                  <Button type="submit" onClick={handleSignUp}>Sign Up</Button>
              </form>
            </Typography>
          </Box>
        </Modal>

        <Modal
          open={openLogin}
          onClose={handleCloseLogin}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                <form className='app__login'>
                  <img
                      className="app__headerImage"
                      src="https://i.pinimg.com/originals/14/e2/d4/14e2d4c02ecab741f68b1cb94571ba24.jpg"
                      alt="instagram logo"
                   />
  
  
                  {/* <input
                      placeholder="username"
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                  /> */}
             
                  <input
                      placeholder="email"
                      type="text"
                      value={existEmail}
                      onChange={(e) => setExistEmail(e.target.value)}
                  />
        
                  <input
                      placeholder='password'
                      type="password"
                      value={existPassword}
                      onChange={(e) => setExistPassword(e.target.value)}
                  />
  
                  <Button type="submit" onClick={handleLogin}>Login</Button>
              </form>
            </Typography>
          </Box>
        </Modal>


        

    </div>
  )
}

export default UserAuth;