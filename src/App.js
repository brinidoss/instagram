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
  }, []);

  onAuthStateChanged(auth, (user) => {
    if (user) {
    setUsername(user.displayName);
    setUser(user);
    setEmail(user.email);
    
    } else {
 
    }
  });

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
