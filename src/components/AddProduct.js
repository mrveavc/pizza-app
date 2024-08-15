import React, { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import options from "../options.json"; 
import { MultiSelect } from "react-multi-select-component";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import InputMask from "react-input-mask";


function AddProduct() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dough, setDough] = useState("");
  const [toppings, setToppings] = useState([]);
  const [extra, setExtra] = useState("");
  const [error, setError] = useState("");
  const { doughOptions, toppingOptions } = options;
  const navigate = useNavigate();
  
  const { currentUser } = useAuth();


 
  const addProduct = async (e) => {
    e.preventDefault();

    const unmaskedPhone = phone.replace(/\D/g, "");
    if (unmaskedPhone.length !== 10) {
      setError("Lütfen geçerli bir telefon numarası girin.");
      return;
    }

    if (!currentUser) {
      setError("Kullanıcı oturum açmamış. Lütfen giriş yapın.");
      return;
    }

    const userDocRef = doc(db, "products", currentUser.uid);

    const docSnapshot = await getDoc(userDocRef);

    if (!docSnapshot.exists()) {
      await setDoc(userDocRef, { products: [] });
    }

    await updateDoc(userDocRef, {
      products: arrayUnion({
        name,
        phone,
        dough,
        toppings,
        extra,
      }),
    });

    navigate("/products");
  };
  return (
    <div className="add-product-container">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={addProduct}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Pizza Name"
          required
        />
       
          <InputMask
          mask="(999) 999-9999"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
        >
          {(inputProps) => (
            <input
              {...inputProps}
              type="tel"
              required
              placeholder="Telefon Numarası"
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
            />
          )}
        </InputMask>
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
       
         <button
          type="submit"
          className="add-product-button"
        >
          Add Product
        </button>
        
      </form>
      <Link to={`/products`}
          type="submit"
        >
          İptal
        </Link>
    </div>
  );
}

export default AddProduct;
