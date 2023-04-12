import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useContext(UserContext);

  async function loginUser(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      setUser(data);
      alert("Login successfull. Now you can continue with booking");
      setRedirect(true);
    } catch (error) {
      alert(error + "Login failed.");
    }
  }
  if (redirect) {
    return <Navigate to={"/home"} />;
  }

  return (
    <div className="mt-6 grow flex items-center justify-around ">
      <div className="mt-32">
        <h1 className="text-4xl text-center mb-7">Login</h1>
        <form
          className="max-w-xl mx-auto flex flex-col items-center"
          onSubmit={loginUser}
        >
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
          <button className="primary">Login</button>
          <div className="py-2 text-gray-500">
            Don't have an account yet?
            <Link
              to="/register"
              className="underline text text-gray-600 font-medium"
            >
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
