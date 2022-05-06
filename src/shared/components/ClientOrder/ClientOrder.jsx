import React from "react";
import "./_ClientOrder.scss";

const ClientOrder = ({
  items,
  address,
  date,
  trasactionId,
  OrderId,
  status,
}) => {
  //ok cambiado map con cantidad precio y ul por p
  return (
    <div className="clientOrder">
      <p>
        Products:{" "}
        {items.map((i, index) => {
          return (
            <p key={index}>
              {i.name} : amount {i.amount} * price {i.price} ={" "}
              {i.amount * i.price} Euros
            </p>
          );
        })}
      </p>
      <p>Address:</p>
      <p>Street: {address.street}</p>
      <p>City:{address.city}</p>
      <p>Country:{address.country}</p>
      <p>Post Code:{address.postcode}</p>
      <p>Order Date: {date}</p>
      <p>TransactionId: {trasactionId}</p>
      <p>OrderId: {OrderId}</p>

      <p>Order Status: {status}</p>
    </div>
  );
};

export default ClientOrder;
