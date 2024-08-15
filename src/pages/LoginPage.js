import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import "../styles/common.css";

const Login = () => {
  const { userLoggedIn, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
      await login(email, password);
    
  };

  return (
    <div className="container">
      {userLoggedIn && <Navigate to={"/products"} replace={true} />}
      <div className="card">
        <h2>Giriş Sayfası</h2>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
          />
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
          />
          {errorMessage && (
            <span className="text-red-600 font-bold">{errorMessage}</span>
          )}

          <button className="auth-button" type="submit">
            "Giriş Yap"
          </button>
        </form>
        <p>
          Hesabınız yok mu?
          <Link className="text-sm text-blue-600 underline " to={"/register"}>
            Yeni Hesap Oluştur
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
