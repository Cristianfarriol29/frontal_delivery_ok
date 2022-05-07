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
  const initialColor =
    status === "Accepted" ? null : status === "In Process" ? "yellow" : "green";

  //ok cambiado map con cantidad precio y ul por p
  return (
    <tr className="clientOrder">
      <td>
        {items.map((i, index) => {
          return (
            <p key={index}>
              {i.name} : amount {i.amount} * price {i.price} =
              {(i.amount * i.price).toFixed(2)} Euros
            </p>
          );
        })}
      </td>

      <td>
        <p>{address.street}</p>
        <p>{address.city}</p>
        <p>{address.country}</p>
        <p>{address.postcode}</p>
      </td>
      <td>{date}</td>
      <td>{trasactionId}</td>
      <td>{OrderId}</td>

      <td className={initialColor}>{status}</td>
    </tr>
  );
};

export default ClientOrder;
