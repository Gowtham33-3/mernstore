import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getAllOrders } from "./helper/adminapicall";

function Orders() {
  const [orderList, setOrderList] = useState([]);
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();
  const getOrders = () => {
    getAllOrders(user._id, token)
      .then((data) => {
        if (data.err) {
          console.log(data.err);
        } else {
          setOrderList(data);
          console.log(data);
        }
        productList();
      })
      .catch((err) => console.log(err));
  };
  const productList = () => {
    Array.prototype.foreach.call(orderList, (order) => {
      setProducts(order.products);
    });
  };
  console.log(products);
  useEffect(async () => {
    await getOrders();
  }, []);

  return (
    <Base title="Welcome ADMIN" description="Manage your orders">
      {products &&
        products.forEach((product, i) => {
          product.map((item, index) => {
            return (
              <table class="table text-white" key={index}>
                <thead>
                  <tr>
                    <th scope="col">S.NO</th>
                    <th scope="col">UserName</th>
                    <th scope="col">ORDER</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <th scope="row">{orderList[i].user.name}</th>
                    <th className="text-white">{item.name}</th>
                    <th className="text-white">{item.price}</th>
                    <th>
                      <button>update status</button>
                    </th>
                  </tr>
                </tbody>
              </table>
            );
          });
        })}
    </Base>
  );
}

export default Orders;
