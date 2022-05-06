import React from "react";
import { useBeveragesContext } from "../../contexts/BeveragesContext";
import Beverage from "../Beverage/Beverage";

const BeveragesList = () => {
  const { beverages } = useBeveragesContext();

  return <Beverage beverages={beverages} />;
};

export default BeveragesList;
