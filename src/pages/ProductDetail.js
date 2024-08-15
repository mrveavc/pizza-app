import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { MultiSelect } from "react-multi-select-component";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import options from "../options.json"; 


function ProductDetail() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dough, setDough] = useState("");
  const [toppings, setToppings] = useState([]);
  const [extra, setExtra] = useState("");
  const [loading, setLoading] = useState(true);
  const { doughOptions, toppingOptions } = options;
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useAuth();



  useEffect(() => {
    const fetchProduct = async () => {
      if (currentUser && id) {
        const userDocRef = doc(db, "products", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userProducts = userDoc.data().products || [];
          const product = userProducts[id];
          if (product) {
            setName(product.name || "");
            setPhone(product.phone || "");
            setDough(product.dough || "");
            setToppings(product.toppings || []);
            setExtra(product.extra || "");
            setLoading(false);
          } else {
            console.error("Ürün bulunamadı.");
            setLoading(false);
          }
        }
      }
    };
    fetchProduct();
  }, [currentUser, id]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (currentUser && id) {
      const userDocRef = doc(db, "products", currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userProducts = userDoc.data().products || [];
        userProducts[id] = { name, phone, dough, toppings, extra };

        await updateDoc(userDocRef, {
          products: userProducts,
        });
        navigate("/products");
      }
    }
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div className="add-product-container">
      <form onSubmit={handleSave}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Pizza Name"
          required
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          required
        />
        <select
          value={dough}
          onChange={(e) => setDough(e.target.value)}
          required
        >
          <option value="">Select Dough</option>
          {doughOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <MultiSelect
          options={toppingOptions}
          value={toppings}
          onChange={setToppings}
          labelledBy="Select Toppings"
        />
        <input
          type="text"
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
          placeholder="Extra Ingredients"
        />
        <button className="add-product-button" type="submit">
          Düzenlemeleri Kaydet
        </button>
      </form>
      <Link  to={`/products`} type="submit">
        İptal
      </Link>
    </div>
  );
}

export default ProductDetail;
