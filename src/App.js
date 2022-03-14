import './App.css';
import Header from './components/Header';
import Post from './components/Post';
import { db, storage, auth, getPosts } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';


function App() {
  
  const currentUser = auth.currentUser;
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  

  //get posts

  useEffect( () => {
    setPosts(getPosts(db));
    //console.log(posts);
  }, []);
  
  if (currentUser !== null) {
    // The user object has basic properties such as display name, email, etc.
    setUsername(user.displayName);
    setEmail(user.email);
    console.log(username);
    //const photoURL = user.photoURL;

  
    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    //const uid = user.uid;
  };

  //sign up
  // const handleSignUp = (event) => {
  //   event.preventDefault();

  //   createUserWithEmailAndPassword(auth, email, password)
  //       .then((userCredential) => {
  //         userCredential.user.displayName = username;
  //         setUser(userCredential.user);
  //         setOpenSignUp(false);
  //       })
  //       .catch((error) => {
  //           //const errorCode = error.code;
  //           const errorMessage = error.message;
  //           alert(errorMessage);
  //       });
  // };

  //sign in
  const handleLogin = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          console.log(userCredential);
          userCredential.user.displayName = username;
          setUser(userCredential.user);
          console.log(user);
          setOpenLogin(false);
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    });
  }


  return (
    <div className="App">
      <Header 
        handleLogin={handleLogin}
      />

        {user ? (
            <p>{user.displayName}</p>
        ) : (
            <p>No one signed in.</p>
        )}
      
    </div>
  );
}

export default App;
