import React from 'react';
import '../styles/Header.css';
import UserAuth from './UserAuth';

function Header({handleSignUp, handleLogin}) {
  return (
    <div className='Header'>
            <img
                className="app__headerImage"
                src="https://i.pinimg.com/originals/14/e2/d4/14e2d4c02ecab741f68b1cb94571ba24.jpg"
                alt="instagram logo"
            />

            <UserAuth
            
            />
    </div>
  )
}

export default Header