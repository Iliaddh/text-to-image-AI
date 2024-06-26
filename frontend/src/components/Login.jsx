import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login({setLogIn}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  
  const signInHandler = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:8080/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
      
    });
    const data = await res.json();
    if(res.status == 200){
      alert("Logged in");
    setLogIn(true);
    navigate("/");
    }else{
      alert(res.message)
    }
    console.log(data);
  };

  return (
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
          <label className="label">
            <Link to="/signup" className="label-text-alt link link-hover">
              Dont have an account?
            </Link>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={signInHandler}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
