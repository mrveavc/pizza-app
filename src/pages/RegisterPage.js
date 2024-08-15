import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userLoggedIn, register } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      await register(email, password);
    }
  };

  return (
    <div className="container">
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <div className="card">
        <h2>Register</h2>
        <form onSubmit={onSubmit}>
          <label className="text-sm text-gray-600 font-bold">Email</label>
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
          />

          <label className="text-sm text-gray-600 font-bold">Password</label>
          <input
            disabled={isRegistering}
            type="password"
            autoComplete="new-password"
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
                  <button
                        type="submit"
                        disabled={isRegistering}
                        className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                    >
                        {isRegistering ? 'Signing Up...' : 'Sign Up'}
                    </button>
                    <p className="text-sm text-center">
                        Already have an account? {'   '}
                        <Link to={'/login'} className="text-center text-sm hover:underline font-bold">Continue</Link>
                    </p>
         
        </form>
        
      </div>
    </div>
   
  );
};

export default Register;
