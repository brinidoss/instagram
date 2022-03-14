import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { collection, getDocs } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyDcXAzDpbPS11Nc9CLUoTFyHItlJ4MXp9E",
    authDomain: "insta-like-gram.firebaseapp.com",
    projectId: "insta-like-gram",
    storageBucket: "insta-like-gram.appspot.com",
    messagingSenderId: "275417239685",
    appId: "1:275417239685:web:c7e54b6c39ec0958ac59ec"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const storage = getStorage(firebaseApp);

  const getPosts = async (database) => {
    const postsCol = collection(database, 'posts');
    const postSnapshot = await getDocs(postsCol);
    const postList = postSnapshot.docs.map ( doc => ({
      id: doc.id,
      post: doc.data() 
    })); 
    console.log(postList);
    //console.log(postList[0].doc.username);
 
    return postList;
  }

  const signUp = (email, password, username) => {
  
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          userCredential.user.displayName = username;
          return userCredential.user;
        })
        .catch((error) => {
            //const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
  };

  

  export { db, auth, storage, getPosts, signUp };