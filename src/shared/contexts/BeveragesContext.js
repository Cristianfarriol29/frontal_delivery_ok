import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

export const BeveragesContext = React.createContext();

export const useBeveragesContext = () => {
  return useContext(BeveragesContext);
};

export default function BeveragesProvider({ children }) {
  const [beverages, setBeverages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products/beverages")
      .then((result) => setBeverages(result.data));
  }, []);

  const store = {
    beverages,
    setBeverages,
  };

  return (
    <BeveragesContext.Provider value={store}>
      {children}
    </BeveragesContext.Provider>
  );
}
