import './App.css';
import Header from './components/Header';
import Post from './components/Post';
import { db, storage, auth, getPosts } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';


function App() {
  
  const currentUser = auth.currentUser;
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [imageUrl, setImageUrl] = useState('');  

  //get posts

  useEffect( () => {
    setPosts(getPosts(db));


    
    // if (currentUser) {
    //   setUser(currentUser);
    //   setUsername(currentUser.displayName);
    // }
    // const unsubscribe = onAuthStateChanged(auth, (res) => {
    //   res ? setUser(res) : setUser(null);
    // })

    //return unsubscribe;
    //console.log(posts);
    //console.log(currentUser);
  }, []);

  // if (user !== currentUser) {
  //   setUser(currentUser);
  //   setUsername(currentUser.displayName);
  //   setEmail(currentUser.email);
  // }

  // if (auth.currentUser && user !== auth.currentUser ) {
  //   setUsername(auth.currentUser.displayName);
  //   //setEmail(auth.currentUser.email);
  //   setUser(auth.currentUser);
  // }
  // if (currentUser) {
  // updateProfile(auth.currentUser, {
  //         displayName: {username}
  //       }).then(() => {
  //         // Profile updated!
  //         // ...
  //       }).catch((error) => {
  //         // An error occurred
  //         // ...
  //       });
  // }

  onAuthStateChanged(auth, (user) => {
    if (user) {
    setUsername(user.displayName);
    setUser(user);
    setEmail(user.email);
    
    //console.log(username);
      //const uid = user.uid;
    
    } else {
      // User is signed out
      // ...
    }
  });

  // if (user !== currentUser) {
  //   setUser(currentUser);
  //   setUsername(currentUser.displayName);
  //   setEmail(currentUser.email);
  // }

  // if (auth.currentUser) {
  //   setUsername(user.displayName);
  // }

  
  
  // if (currentUser) {
  //   // The user object has basic properties such as display name, email, etc.
  //   setUsername(currentUser.displayName);
  //   setEmail(currentUser.email);
  //   setUser(currentUser);
  //   console.log(username);
  //   //const photoURL = user.photoURL;

  
  //   // The user's ID, unique to the Firebase project. Do NOT use
  //   // this value to authenticate with your backend server, if
  //   // you have one. Use User.getToken() instead.
  //   //const uid = user.uid;
  // };

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
          userCredential.displayName = username;
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

  console.log(auth.currentUser);
  console.log(user);
  //console.log(username);

  // if (user !== currentUser) {
  //   setUser(currentUser);
  //   setUsername(currentUser.displayName);
  //   setEmail(currentUser.email);
  // }

  // if (user) {
  //   setUsername(user.displayName);
  // }

  return (
    <div className="App">
      <Header 
        handleLogin={handleLogin}
      />

        {user ? (
            <p>here!</p>
        ) : (
            <p>No one signed in.</p>
        )}
      
    </div>
  );
}

export default App;
