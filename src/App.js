import React from "react";
import './style.scss'
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home"
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Routes, Route, Navigate } from 'react-router-dom'


// last updated June 19, 2023
// TO-DO:
  // Error handling:
    // Error message if no user is selected for chat
  // More intuitive add users feature
  // dont allow duplicate display names
  // 2FA/email verification? might cost $

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to='/signin' />
    }

    return children
  }

  return (
    <div className="App"> 
      <Routes>
        <Route exact path="/">
          <Route index element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
          }/>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />

        </Route>
      </Routes>
      {/* <Signup /> */}
      {/* <Signin /> */}
      {/* <Home /> */}
    </div>
  );

}

export default App;
