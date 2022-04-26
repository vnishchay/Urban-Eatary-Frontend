import axios from "axios";
import React, { useState, useEffect } from "react";

export default function OrderTile(orders) {
  orders = orders.orders;
  console.log(orders);
  const [img, setImg] = useState();
  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/v1/food/foodItem/${orders.foodItems[0].itemId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken_foodie"),
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        // setImg(res.);
      });
  }, []);

  return (
    <div class="col-lg-12">
      <div class="card border-0 mb-4 mt-4 shadow bg-white rounded">
        <div class="d-flex p-4">
          <div class="horizontal-card-bg-img">
            <img className="card-img" src="https://i.imgur.com/BaS2G0b.png" />
          </div>
          <div class="flex-fill ml-5">
            <div class="card-body">
              <div class="font-weight-bold mt-3">{orders.name}</div>
              <div class="mb-3">
                Qty:
                {orders.foodItems[0].quantity
                  ? orders.foodItems[0].quantity
                  : 1}
              </div>
              <div class="mb-3">Delivery Address: {orders.address}</div>
            </div>
          </div>
          <div class="horizontal-card-btn-container d-flex justify-content-center align-items-center"></div>
        </div>
      </div>
    </div>
  );
}
