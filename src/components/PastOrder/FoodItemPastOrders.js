import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import "./button.css";

const FoodItemPastOrders = ({ _id }) => {
  const [item, setitem] = useState()
  useEffect(() => {
    axios.get(`https://urban-eatary-backend.herokuapp.com/api/v1/food/foodItem/${_id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authToken_foodie")
      }
    }).then((res) => {
      console.log(res.data)
      setitem(res.data.data)
    })
  }, [])

  return (
    <div className="col-md-4 mb-4">
      {item && <Link to={"food/" + item._id}>
        <div className="card text-center">
          <img src={item.img} alt="FoodItem" className="card-img-top" />
          <div className="card-body">
            <h5>{item.name}</h5>
            <p>{item.description}</p>
            <h4>₹{item.price * 40}</h4>
          </div>
          <Button />
        </div>
      </Link>}
    </div>
  );
};

export default FoodItemPastOrders;
