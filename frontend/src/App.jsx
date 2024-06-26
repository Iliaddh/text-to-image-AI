import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useState } from "react";

import { logo } from "./assets";
import { Home, CreatePost } from "./pages";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Login from "./components/Login"
function App() {
  
  const [signUp, setSignUp] = useState(false);
  const [logIn, setLogIn] = useState(false);

  const logOutHandler = () => {
    setLogIn(false);
    setSignUp(false);
  }

  
  return (
    <BrowserRouter>
      {/* Hero */}

      {/* /////////////////////////////////// */}
      <div className="navbar bg-base-100 ">
        <div className="navbar-start">
          <div className="dropdown">
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>

          <Link to="/">
            <img src={logo} alt="logo" className="w-16 object-contain" />
          </Link>
        </div>
        <div className="navbar-center lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">
                <p>Home</p>
              </Link>
            </li>
            <li>
              <a>About us</a>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          {logIn || signUp ? <button className="btn btn-success  text-white " onClick={logOutHandler} >Log out</button>: <Link to="/login">
            <button className="btn btn-success  text-white w-16" >Login</button>
          </Link>}
        </div>
      </div>
      {/* ///////////////////////////////////////// */}

      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/signup" element={<SignUp setSignUp = {setSignUp} />} />
          <Route path="/login" element={<Login  setLogIn = {setLogIn} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
