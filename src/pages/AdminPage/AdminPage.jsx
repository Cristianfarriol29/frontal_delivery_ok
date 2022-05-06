import AdminData from "../../shared/components/AdminData/AdminData";
import React, { useState, useEffect } from "react";
import axios from "axios";

//hacer fetch o get con axios de los datos de orders y mapear el componente admindata
//ahora mismo estoy simulando
const AdminPage = () => {
  let user = JSON.parse(localStorage.getItem("user"));

  const { name, _id } = user;

  console.log(name, _id);
  let userToken = localStorage.getItem("token");

  const [usersOrders, setUsersOrders] = useState([]);

  // console.log("userOrder",usersOrders)

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/order`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        let orders = response.data;

        console.log(orders);

        setUsersOrders(orders);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userToken]);

  return (
    <div>
      <h1>USERS ORDERS</h1>
      {usersOrders.map((order, index) => {
        console.log(order);

        return (
          <AdminData
            key={index}
            items={order.orderedProducts}
            date={order.createdAt.substring(0, 10)}
            orderId={order._id}
            userId={order.userId}
            email={order.email}
            price={order.totalPrice}
            status={order.deliverStatus}
          />
        );
      })}
    </div>
  );
};

export default AdminPage;
