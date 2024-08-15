import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { useTheme } from "../components/Theme";
import { useAuth } from "../contexts/Auth"; 
import {  getDoc, doc ,updateDoc} from "firebase/firestore";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { theme } = useTheme();
  const { currentUser } = useAuth(); 

  useEffect(() => {
    const fetchProducts = async () => {
      if (!currentUser) {
        console.error("Oturum açılmadı.");
        return;
      }

      const userDocRef = doc(db, "products", currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userProducts = userDoc.data().products || [];
        setProducts(userProducts);
      } else {
        console.error("Kullanıcı ürünü bulunamadı.");
      }
    };

    fetchProducts();
  }, [currentUser]);

  const handleDelete = async (index) => {
    if (!currentUser) return;

    const userDocRef = doc(db, "products", currentUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userProducts = userDoc.data().products || [];
      userProducts.splice(index, 1);

      await updateDoc(userDocRef, {
        products: userProducts,
      });

      setProducts(userProducts);
    }
  };

  return (
    <div className={`products-page ${theme}`}>
      <Link className="add-product-button" to={"/addProduct"}>
        Pizza Oluştur
      </Link>

      <div className="products-list">
        {products.length === 0 ? (
          <p>Kullanıcını pizzası bulunamadı</p>
        ) : (
          products.map((product, index) => (
            <div key={index} className="product-card">
              <h2>{product.name}</h2>
              <hr></hr>
              <p>Telefon: {product.phone}</p>
              <p>Kenar Tipi: {product.dough}</p>
              <p>
                İçindekiler:{" "}
                {product.toppings.map((topping) => topping.label).join(", ")}
              </p>
              <p>Extra Malzemeler: {product.extra}</p>
              <Link className="edit-button" to={`/productDetail/${index}`}>
                Düzenle
              </Link>
              <button
                className="delete-button"
                onClick={() => handleDelete(index)}
              >
                Sil
              </button>
            </div>
          ))
        )}
      </div>
      
    </div>
  );
}

export default ProductsPage;
