import React from "react";
import { usePizzaContext } from "../../contexts/PizzaContext";
import Pizza from "../../components/Pizza/Pizza";
import "./_PizzaList.scss";

const PizzaList = () => {
  const { pizzas, search, setSearch, pizzasSearch } = usePizzaContext();

  return (
    <>
      <div className="inputSearch">
        <h1>Busca tu pizza favorita!</h1>
        <input
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
