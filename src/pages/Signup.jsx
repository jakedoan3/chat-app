import React, { useState } from "react";
import { IconContext } from "react-icons/lib";
import { BsFillImageFill } from "react-icons/bs";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const passwordConfirm = e.target[3].value;
    const file = e.target[4].files[0];

    if (password !== passwordConfirm) {
      return setError("Passwords must match");
    }

    // if (!displayName || !email || !password || !passwordConfirm || !file) {
    //   return setError("Please fill out all fields");
    // }

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate('/')
            
          } catch (err) {
            console.log(err);
            setError(err);
            
          }
        });
      });
    } catch (err) {
      setError(err);
      
    }
  };
  return (
    <div className="formcontainer">
      <div className="formwrapper">
        <span className="logo">Chat</span>
        <span className="title">Create Account</span>
        {error ? <p className="error">{error}</p> : null}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Display name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <input
            style={{ display: "none" }}
            type="file"
            id="profilepic"
            required
          />
          <label htmlFor="profilepic">
            <IconContext.Provider value={{ color: "#357144", size: "30px" }}>
              <BsFillImageFill />
            </IconContext.Provider>
            <span>Add Profile Pic</span>
          </label>
          <button>Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/signin">Sign In</Link></p>
      </div>
    </div>
  );
};

export default Signup;
