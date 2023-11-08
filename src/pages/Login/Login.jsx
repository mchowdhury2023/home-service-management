import React, { useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import app from '../../Firebase/firebase.config';
import axios from 'axios';

const Login = () => {

    const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const { signIn } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

      await signIn(email, password)
      .then((result) => {
        const loggedInUser = result.user;
        //navigate(location?.state ? location.state : "/");
        const user = { email };

        //get access token
        axios.post('https://home-service-server-seven.vercel.app/jwt', user, {withCredentials:true})
            .then(res => {
                console.log(res.data)
                if (res.data.success) {
                    navigate(location?.state ? location?.state : '/')
                }
            })
      })
      .catch((error) => {
        //console.log(error.message);
        if (error.code === "auth/invalid-login-credentials") {
          toast.error("Invalid login credentials. Please check your email and password.");
        } else {
          toast.error(error.message);
        }
      });
  
};

  const handleSignInWithGoogle = async () => {
    
      const result = await signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedInUser = result.user;
        //navigate(location?.state ? location.state : "/");
        const user = { email };

        //get access token
        axios.post('https://home-service-server-seven.vercel.app/jwt', user, {withCredentials:true})
            .then(res => {
                console.log(res.data)
                if (res.data.success) {
                    navigate(location?.state ? location?.state : '/')
                }
            })
      })
      .catch((error) => {
        console.log("error ", error.message);
      });
  };

  // Return JSX for login form
  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <h3>{isNewUser ? 'Register' : 'Sign In'}</h3>
        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            {isNewUser ? 'Register' : 'Login'}
          </button>
        </div>
        <div className="mb-3">
          <button type="button" className="btn btn-danger" onClick={handleSignInWithGoogle}>
            Sign in with Google
          </button>
        </div>
        <p>
          {isNewUser
            ? 'Already have an account? '
            : "Don't have an account? "}
        <a
            href="#!"
            onClick={(e) => {
              e.preventDefault();
              navigate('/register');
            }}
          >
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};
    
    export default Login;