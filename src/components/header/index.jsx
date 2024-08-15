import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import { useTheme } from "../../components/Theme";

const Header = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { userLoggedIn, logout } = useAuth();
  return (
    <nav className="header">
      {userLoggedIn ? (
        <>
          <ThemeSwitcher></ThemeSwitcher>

          <button
            onClick={() => {
              logout().then(() => {
                navigate("/login");
              });
            }}
            className="text-sm text-blue-600 underline"
          >
            Logout
          </button>
        </>
      ) : (
        <></>
      )}
      <style>{`
        body {
          background: ${theme === "light" ? "black" : "white"};
        }
        .add-product-button {
          background-color: ${theme === "light" ? "black" : "white"};
          color: ${theme === "light" ? "white" : "black"};
        }

        .product-card {
          background-color: ${theme === "light" ? "#f5f5f5" : "#444"};
          border: 1px solid ${theme === "light" ? "#ddd" : "#666"};
        }

        .product-card p,
        .product-card h2 {
          color: ${theme === "light" ? "black" : "white"};
        }

        .product-card a {
          background-color: ${theme === "light" ? "black" : "white"};
          color: ${theme === "light" ? "white" : "black"};
        }

        .product-card .delete-button {
          background-color: ${theme === "light" ? "black" : "white"};
          color: ${theme === "light" ? "white" : "black"};
        }
        .header button{
          background-color: ${theme === "light" ? "white" : "black"};
           color: ${theme === "light" ? "black" : "white"};    
        }
        .add-product-container{
         background-color: ${theme === "light" ? "white" : "black"};
           color: ${theme === "light" ? "black" : "white"};    }
      `}</style>
    </nav>
  );
};

export default Header;
