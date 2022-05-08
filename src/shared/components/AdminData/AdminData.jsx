import React, { useState } from "react";

import Swal from "sweetalert2";

import axios from "axios";

import "./_AdminData.scss";

const AdminData = ({
  date,
  orderId,
  userId,
  email,
  price,
  status,
  items,
  name,
}) => {
  const [orderStatus, setOrderStatus] = useState(status);
  const [postData, setPostData] = useState({});

  const initialState =
    status === "Accepted" ? null : status === "In Process" ? "yellow" : "green";

  const [color, setColor] = useState(initialState);

  let differentStatus = ["Accepted", "In Process", "Delivered"];

  const postStatus = async (data) => {
    const { Id, state } = data;

    try {
      const response = await axios.post("http://localhost:8000/api/status", {
        state,
        Id,
      });

      if (response.status === 201) {
        Swal.fire("Ok Updated State");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeColor = (estado) => {
    if (estado === "Delivered") {
      setColor("green");
    } else if (estado === "In Process") {
      setColor("yellow");
    } else {
      setColor(null);
    }
  };

  return (
    <tr className="adminData">
      <td>{date}</td>
      <td>{orderId}</td>
      <td>{userId}</td>
      <td>{email}</td>

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
      <td>{price.toFixed(2)} Euros</td>

      <td>
        <select
          className="select"
          value={orderStatus}
          onChange={(e) => {
            setOrderStatus(e.target.value);

            setPostData({
              ...postData,
              Id: orderId,
              state: e.target.value,
            });

            // postStatus(orderId, e.target.value)

            console.log(orderId);
          }}
        >
          {differentStatus.map((status, index) => {
            return (
              <option key={index} value={status}>
                {status}
              </option>
            );
          })}
        </select>
      </td>
      <td>
        <button
          onClick={() => {
            postStatus(postData);
            changeColor(orderStatus);
          }}
          className={color}
        >
          Submit
        </button>
      </td>
    </tr>
  );
};

export default AdminData;
