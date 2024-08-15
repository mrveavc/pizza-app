import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { useTheme } from "../components/Theme";
import "../styles/MultiSelect.css";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className={`products-page ${theme}`}>
      <Link className="add-product-button" to={"/addProduct"}>
        Pizza Oluştur
      </Link>

      <div className="products-list">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <h2>{product.name}</h2>
              <hr></hr>
              <p>Phone: {product.phone}</p>
              <p>Dough: {product.dough}</p>
              <p>
                Toppings:{" "}
                {product.toppings.map((topping) => topping.label).join(", ")}
              </p>
              <p>Extra: {product.extra}</p>
              <Link className="edit-button" to={`/productDetail/${product.id}`}>
                Edit
              </Link>
              <button
                className="delete-button"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
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
      `}</style>
    </div>
  );
}

export default ProductsPage;
