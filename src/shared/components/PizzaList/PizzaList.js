import React from "react";
import { usePizzaContext } from "../../contexts/PizzaContext";
import Pizza from "../../components/Pizza/Pizza";
import "./_PizzaList.scss";

const PizzaList = () => {
  const { pizzas, search, setSearch, pizzasSearch } = usePizzaContext();
  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="inputSearch">
        {(user !== null) & (user.role === "admin") ? (
          <h2>Busca el producto que deseas eliminar!</h2>
        ) : (
          <h2>Busca tu pizza favorita!</h2>
        )}
        <input
          placeholder={
            (user !== null) & (user.role === "admin")
              ? "Busca el producto que deseas eliminar..."
              : "Busca tu pizza favorita..."
          }
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Pizza pizzas={pizzasSearch.length > 0 ? pizzasSearch : pizzas} />;
    </>
  );
};

export default PizzaList;
