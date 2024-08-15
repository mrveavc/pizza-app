import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { MultiSelect } from "react-multi-select-component";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dough, setDough] = useState("");
  const [toppings, setToppings] = useState([]);
  const [extra, setExtra] = useState("");
  const navigate = useNavigate();

  const doughOptions = [
    { label: "Thin", value: "thin" },
    { label: "Thick", value: "thick" },
  ];

  const toppingOptions = [
    { label: "Pepperoni", value: "pepperoni" },
    { label: "Mushrooms", value: "mushrooms" },
    { label: "Onions", value: "onions" },
  ];

  const addProduct = async (e) => {
    await addDoc(collection(db, "products"), {
      name,
      phone,
      dough,
      toppings,
      extra,
    });
  };

  return (
    <div>
      <form>
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
        <button
          onClick={() => {
            addProduct().then(() => {
              navigate("/products");
            });
          }}
          className="text-sm text-blue-600 underline"
        >
          Logout
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
