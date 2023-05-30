import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate, Link  } from "react-router-dom";
import { auth } from "../firebase";

const Signin = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="formcontainer">
      <div className="formwrapper">
        <span className="logo">Chat</span>
        <span className="title">Log In</span>
        {error ? <p className="error">{error}</p> : null}
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign Up</button>
        </form>
        <p>New user? <Link to="/signup">Create Account</Link></p>
      </div>
    </div>
  );
};

export default Signin;
