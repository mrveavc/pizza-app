import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { MultiSelect } from "react-multi-select-component";
import { useNavigate, useParams } from 'react-router-dom';

function ProductDetail() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dough, setDough] = useState('');
  const [toppings, setToppings] = useState([]);
  const [extra, setExtra] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const doughOptions = [
    { label: 'Thin', value: 'thin' },
    { label: 'Thick', value: 'thick' }
  ];

  const toppingOptions = [
    { label: 'Pepperoni', value: 'pepperoni' },
    { label: 'Mushrooms', value: 'mushrooms' },
    { label: 'Onions', value: 'onions' }
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || '');
          setPhone(data.phone || '');
          setDough(data.dough || '');
          setToppings(data.toppings || []);
          setExtra(data.extra || '');
          setLoading(false);
        }
      }
    };
    fetchProduct();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (id) {
      const docRef = doc(db, 'products', id);
      await updateDoc(docRef, {
        name,
        phone,
        dough,
        toppings,
        extra
      });
      navigate('/products');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
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
        <select value={dough} onChange={(e) => setDough(e.target.value)} required>
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ProductDetail;
