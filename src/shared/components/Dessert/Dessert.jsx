import React, { useState } from "react";
import ModalBeverages from "../ModalBeverages/ModalBeverages";
import ModalDessert from "../ModalDesserts/ModalDessert";

const Dessert = ({ desserts }) => {
  const [show, setShow] = useState(false);
  const [dessertFiltrada, setDessertFiltrada] = useState([]);
  const [ID, setID] = useState("");

  const filtrarBeverage = (id) => {
    setDessertFiltrada(desserts.filter((p) => p._id === id));
  };

  return (
    <div className="pizza_card">
      {desserts.map((dessert) => {
        return (
          <div className="pizza_card-individual">
            <img src={dessert.img} width={250} height={250} />
            <h1>POSTRE {dessert.name.toUpperCase()}</h1>
            <div className="pizza_card-individual-details resumen">
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour
              </p>
            </div>

            <button
              onClick={() => [
                filtrarBeverage(dessert._id),
                setShow(true),
                setID(dessert._id),
              ]}
              className="btn"
            >
              Pedir
            </button>

            {show && ID === dessert._id && (
              <ModalDessert
                dessertFiltrada={dessertFiltrada}
                closeModal={setShow}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Dessert;
