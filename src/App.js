
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
