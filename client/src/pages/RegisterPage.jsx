import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      navigate("/login");
      alert("Registration successfull. Now you can login");
    } catch (error) {
      alert("Registration failed.");
    }
  }

  return (
    <div className="mt-6 grow flex items-center justify-around ">
      <div className="mt-32">
        <h1 className="text-4xl text-center mb-7">Register</h1>
        <form
          className="max-w-xl mx-auto flex flex-col items-center"
          onSubmit={registerUser}
        >
          <input
            type="text"
            placeholder="Pavel Petkov"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Register</button>
          <div className="py-2 text-gray-500">
            Already have an account?
            <Link
              to="/login"
              className="underline text text-gray-600 font-semibold"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
