// // import Login from "./components/auth/login";
// // import Register from "./components/auth/register";

// // import Header from "./components/header";
// // import Home from "./components/home";

// // import { AuthProvider } from "./contexts/authContext";
// // import { useRoutes,BrowserRouter as Router } from "react-router-dom";

// // function App() {
// //   const routesArray = [
// //     {
// //       path: "*",
// //       element: <Login />,
// //     },
// //     {
// //       path: "/login",
// //       element: <Login />,
// //     },
// //     {
// //       path: "/register",
// //       element: <Register />,
// //     },
// //     {
// //       path: "/home",
// //       element: <Home />,
// //     },
// //   ];
// //   let routesElement = useRoutes(routesArray);
// //   return (
// //     <AuthProvider>
// //       <Router>
// //       <Header />
// //       <div className="w-full h-screen flex flex-col">{routesElement}</div>
// //       </Router>
// //     </AuthProvider>
// //   );
// // }

// // export default App;

// import React from 'react';
// import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

// // import Login from './components/auth/login';
// import LoginPage from './pages/LoginPage';

// import RegisterPage from './pages//RegisterPage';
// import Header from './components/header';
// // import Home from './components/home';
// import ProductsPage from './pages/ProductsPage'; 

// // import { AuthProvider } from './contexts/authContext';
// import { AuthProvider } from './contexts/Auth';


// function AppRoutes() {
//   const routes = [
//     { path: '/', element: <LoginPage /> },
//     { path: '/login', element: <LoginPage /> },
//     { path: '/register', element: <RegisterPage /> },
//     { path: '/products', element: <ProductsPage /> },
//     { path: '*', element: <LoginPage /> },
//   ];

//   return useRoutes(routes);
// }

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
        
//         <Header />
//         <div className="w-full h-screen flex flex-col">
//           <AppRoutes />
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


// src/App.js
import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { AuthProvider } from './contexts/Auth';
import { ThemeProvider } from './components/Theme';
import  AddProduct from './components/AddProduct';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/header';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';



function AppRoutes() {
  const routes = [
    { path: '/', element: <LoginPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/products', element: <ProductsPage /> },
    { path: '/addProduct', element: <AddProduct /> },
    { path: '/productDetail/:id', element: <ProductDetail /> },
    { path: '*', element: <LoginPage /> },

  ];

  return useRoutes(routes);
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Header />
            <AppRoutes />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
