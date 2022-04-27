import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FoodItemPastOrders from "./FoodItemPastOrders";
import "./PastOrder.css";
import firebase from "../firebase-config";
import { useAuth } from "../SignUp/useAuth";
import axios from "axios";

const FoodsPastOrder = (props) => {
  const [selectedFastFoods, setselectedFastFoods] = useState([])

  useEffect(() => {
    axios.get('https://urban-eatary-backend.herokuapp.com/api/v1/order/pastOrders', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authToken_foodie")
      }
    }).then((res) => {
      console.log(res.data)
      res.data.data.forEach(element => setselectedFastFoods((pre) => [...pre, element]));
    })
  }, [])

  return (
    <section className="food-area my-5">
      <div className="container">
        <h1 className="my-order-heading">My Orders</h1>
        <div className="container">
          {selectedFastFoods &&
            <div className="row my-5">
              {selectedFastFoods.map((order) => (

                order.foodItems.map((food) => {

                  return <FoodItemPastOrders _id={food.itemId} key={food._id} />

                })
              ))}
            </div>
          }
        </div>
      </div>
    </section>
  );
};

export default FoodsPastOrder;
