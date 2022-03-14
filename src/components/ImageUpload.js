import React, {useState} from 'react'
import Button from '@mui/material/Button';
import { storage, db } from '../firebase';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import { FirebaseError } from 'firebase/app';

function ImageUpload() {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
          
          // Upload file
          const storageRef = ref(storage, `/images/${image.name}`);
          const uploadTask = uploadBytesResumable(storageRef, image);
          
          // Listen for state changes, errors, and completion of the upload.
          uploadTask.on('state_changed',
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              )
              console.log('Upload is ' + progress + '% done');
            }, 
            (error) => {  
                console.log(error);
            }, 
            () => {
              // Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log(`File available at ${downloadURL}`);
              });
            }
          );
    }

    // const handleUpload = () => {
    //     //const storageRef = ref (storage, {});

    //     const uploadTask = storage.ref(`images/${image.name}`).put(image);
    //     uploadTask.on(
    //         "state_changed",
    //         (snapshot) => {
    //             //progress function
    //             const progress = Math.round(
    //                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //             );
    //             setProgress(progress);
    //         },
    //         (error) => {
    //             console.log(error);
    //             alert(error.message);
    //         },
    //         () => {
    //             //complete function
    //             storage
    //                 .ref("iamges")
    //                 .child(image.name)
    //                 .getDownloadURL()
    //                 .then(url => {
    //                     //post image inside db
    //                     db.collection("posts").add({
    //                         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //                         caption: caption, 
    //                         imageUrl: url,
    //                         username: username //<--- here
    //                     })
    //                 })

    //         }
    //     )
    // }

  return (
    <div>
        <input type="text" placeholder='Enter a caption'value={caption} onChange={event => setCaption(event.target.value)}/>
        <input type="file" onChange={handleChange} />
        <Button onClick={handleUpload}>
            Upload
        </Button>
    </div>
  )
}

export default ImageUpload;