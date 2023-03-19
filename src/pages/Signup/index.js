import React, { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import './signup.css';

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://localhost:7296/api/User/signup", {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
          rePassword,
          email,
          fullname,
          dob,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.text();
      if (data === "Sign Up successfully") {
        alert("Sign up success");
        navigate("/login");
      }
      else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Confirm password:
        <input
          type="password"
          value={rePassword}
          onChange={(event) => setRePassword(event.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <br />
      <label>
        Fullname:
        <input
          type="text"
          value={fullname}
          onChange={(event) => setFullname(event.target.value)}
        />
      </label>
      <br />
      <label>
        Date of birth:
        <input
          type="date"
          value={dob}
          onChange={(event) => setDob(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}