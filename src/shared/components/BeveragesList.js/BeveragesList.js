import React from "react";
import { useBeveragesContext } from "../../contexts/BeveragesContext";
import Beverage from "../Beverage/Beverage";

const BeveragesList = () => {
  const { beverages, beveragesSearch, search, setSearch } =
    useBeveragesContext();
  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="inputSearch">
        {(user !== null) & (user.role === "admin") ? (
          <h2>Busca el producto que deseas eliminar!</h2>
        ) : (
          <h2>Busca tu bebida favorita!</h2>
        )}
        <input
          placeholder={
            (user !== null) & (user.role === "admin")
              ? "Busca el producto que deseas eliminar..."
              : "Busca tu bebida favorita..."
          }
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Beverage
        beverages={beveragesSearch.length > 0 ? beveragesSearch : beverages}
      />
      ;
    </>
  );
};

export default BeveragesList;
