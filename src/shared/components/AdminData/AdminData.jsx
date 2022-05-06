import React, { useState } from "react";

import Swal from "sweetalert2";

import axios from "axios";

import "./_AdminData.scss";

const AdminData = ({ date, orderId, userId, email, price, status, items }) => {
  const [orderStatus, setOrderStatus] = useState(status);
  const [postData, setPostData] = useState({});

  console.log(status);

  let differentStatus = ["Accepted", "Processing", "Delivered"];

  const postStatus = async (data) => {
    const { Id, state } = data;

    try {
      const response = await axios.post("http://localhost:8000/api/status", {
        state,
        Id,
      });

      console.log("+++++", response.status);

      if (response.status === 201) {
        Swal.fire("Ok Updated State");
      }
    } catch (err) {
      console.log(err);
    }
    console.log("*****", data);
  };

  // console.log(orderStatus)

  return (
    <div className="adminData">
      <p>Order Date:{date}</p>
      <p>OrderId:{orderId}</p>
      <p>UserID:{userId}</p>
      <p>Email:{email}</p>
      <p>
        Products:{" "}
        {items.map((i, index) => {
          return (
            <li key={index}>
              {i.name} : amount {i.amount} * price {i.price} ={" "}
              {i.amount * i.price} Euros
            </li>
          );
        })}
      </p>
      <p>Total Price: {price}</p>

      <p>Order Status</p>

      <select
        className="select"
        value={orderStatus}
        onChange={(e) => {
          setOrderStatus(e.target.value);

          console.log(e.target.value);

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

      <button onClick={() => postStatus(postData)}>Submit</button>
    </div>
  );
};

export default AdminData;
