import './App.css';
import Header from './components/Header';
import Post from './components/Post';
import { db, storage, auth, getPosts } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import ImageUpload from './components/ImageUpload';


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
      setUser(null);
      setUsername(null);
      setEmail('');
    }
  });

  console.log(user);

  return (
    <div className="App">
      <Header 
        user={user}
      />

        {user ? (
            <p>here!</p>
        ) : (
            <p>No one signed in.</p>
        )}

      <ImageUpload />
      
    </div>
  );
}

export default App;
