import AdminData from "../../shared/components/AdminData/AdminData";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./_AdminPage.scss";

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
    <div className="body">
      <div className="title-box">
        <h1>USERS ORDERS</h1>
      </div>

      <table id="customers">
        <tr>
          <th>Order Date</th>
          <th>Order Id</th>
          <th>User Id</th>
          <th>User Email</th>
          <th>Ordered Products</th>
          <th>Total Price</th>
          <th>Order Status</th>
          <th>Submit Order</th>
        </tr>
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
      </table>
    </div>
  );
};

export default AdminPage;
