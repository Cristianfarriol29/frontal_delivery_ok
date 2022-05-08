import React, { useState, useEffect } from "react";
import ClientOrder from "../../shared/components/ClientOrder/ClientOrder";
import "./_ClientOrdersPage.scss";

import axios from "axios";

const ClientsOrdersPage = () => {
  let user = JSON.parse(localStorage.getItem("user"));

  const { name, _id } = user;

  console.log(name, _id);
  let userToken = localStorage.getItem("token");

  const [usersOrders, setUsersOrders] = useState([]);

  console.log("userOrder", usersOrders);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/order`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        let orders = response.data.filter((data) => data.userId === _id);

        console.log(orders);

        setUsersOrders(orders.reverse());
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userToken, _id]);

  return (
    <div className="orderContainer">
      <div className="order-box">
        <h1>Orders of {name.toUpperCase()}</h1>
      </div>

      <table id="customers">
        <tr>
          <th className="client-order">
            <h1>Ordered Products</h1>
          </th>
          <th className="client-order">
            <h1>{name.toUpperCase()}´s address</h1>
          </th>
          <th className="client-order">
            <h1>Order Date</h1>
          </th>
          <th className="client-order">
            <h1>Transaction Id</h1>
          </th>
          <th className="client-order">
            <h1>Order Id</h1>
          </th>
          <th className="client-order">
            <h1>Order Status</h1>
          </th>
        </tr>

        {usersOrders.map((item, index) => {
          return (
            <ClientOrder
              items={item.orderedProducts}
              status={item.deliverStatus}
              address={item.shippingAddress}
              date={item.createdAt.substring(0, 10)}
              trasactionId={item.transactionId}
              OrderId={item._id}
            />
          );
        })}
      </table>
    </div>
  );
};

export default ClientsOrdersPage;
