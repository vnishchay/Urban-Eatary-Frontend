import {
  faCartArrowDown,
  faCheckCircle,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import RecommendFood from "../RecommendFood/RecommendFood";
import axios from "axios";
import "./FoodDetails.css";

const FoodDetails = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let history = useHistory();

  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [suggestionFood, setSuggestionFood] = useState([]); // for getting shuffled food data
  const [suggestFoods, setSuggestFoods] = useState([]); // for getting 3 recommended food
  const [currentFood, setCurrentFood] = useState({});

  const shuffle = (item) => {
    for (let i = item.length; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      [item[i - 1], item[j]] = [item[j], item[i - 1]];
    }
    return item;
  };

  useEffect(() => {
    axios
      .get(`https://urban-eatary-backend.herokuapp.com/api/v1/food/foodItem`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("authToken_foodie"),
        },
      })
      .then((result) => {
        const allFoodData = result.data.data;
        setSuggestionFood(shuffle(allFoodData));
        setCurrentFood(allFoodData.find((food) => food._id === id));
        axios
          .get(
            `https://urban-eatary-backend.herokuapp.com/api/v1/restaurant/getRestaurant/${currentFood.restaurant}`,
            {
              headers: {
                authorization:
                  "Bearer " + localStorage.getItem("authToken_foodie"),
              },
            }
          )
          .then((result) => {
            console.log(result.data);
            props.setrestaurant(result.data);
          });
      });
  }, []);

  useEffect(() => {
    if (currentFood) {
      if (currentFood.quantity) {
        setQuantity(currentFood.quantity);
      }
    }
  }, [currentFood]);

  const finalCartHandler = (currentFood) => {
    const availableQty = parseInt(currentFood.qty);
    console.log(currentFood);
    console.log("available food: " + availableQty);
    if (quantity > availableQty) {
      setIsMore(true);
    } else {
      setIsSuccess(true);
      setQuantity(quantity);
      currentFood.quantity = quantity;
      props.cartHandler(currentFood);
    }
  };

  if (isMore) {
    setTimeout(() => setIsMore(false), 4500);
  }

  if (isSuccess) {
    setTimeout(() => setIsSuccess(false), 1500);
  }

  useEffect(() => {
    const suggestFood = suggestionFood.slice(0, 3);
    setSuggestFoods(suggestFood);
  }, [suggestionFood]);

  let m = 0;
  let n = 3;
  const newSuggestionFood = () => {
    const newSuggestFood = suggestionFood.slice(m + 3, n + 3);
    suggestionFood.splice(m, 3);
    setSuggestFoods(newSuggestFood);
  };

  function goBack() {
    history.push("/");
    window.scrollTo(0, 9999);
  }

  return (
    <div className="food-details container scrollable">
      {currentFood && (
        <>
          <div className="text-center">
            <div onClick={goBack}>
              <button
                className="btn btn-danger btn-rounded my-3"
                onClick={newSuggestionFood}
              >
                <FontAwesomeIcon icon={faWindowClose} />
                <span> Close </span>
              </button>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-md-7 pr-md-4">
              <h1>{currentFood.name}</h1>
              <p className="my-5">{currentFood.story}</p>
              <div className="d-flex my-4">
                {currentFood.price && (
                  <h2 className="price">
                    ₹{currentFood.price.toFixed(1) * 40}
                  </h2>
                )}

                <div className="cart-controller ml-3 btn">
                  <button
                    className="btn"
                    onClick={() => {
                      setQuantity(quantity <= 1 ? 1 : quantity - 1);
                    }}
                  >
                    -
                  </button>
                  {quantity}
                  <button
                    className="btn"
                    onClick={() => {
                      setQuantity(quantity + 1);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action d-flex align-items-center">
                <button
                  className="btn btn-danger btn-rounded mb-2"
                  onClick={() => finalCartHandler(currentFood)}
                >
                  <FontAwesomeIcon icon={faCartArrowDown} />
                  <span> Add</span>
                </button>
                {isSuccess && (
                  <p className="ml-3 success-mgs text-success">
                    <FontAwesomeIcon icon={faCheckCircle} /> Item added to Cart
                  </p>
                )}
                {isMore && (
                  <>
                    <p className="ml-3 fail-mgs text-danger">
                      <FontAwesomeIcon icon={faCheckCircle} /> You have selected
                      more items than are in the cart
                    </p>
                    <br />
                  </>
                )}
                {currentFood.qty &&
                  parseInt(currentFood.qty) > 0 &&
                  parseInt(currentFood.qty) <= 10 && (
                    <p className="ml-3 qty-mgs text-danger">
                      Hurry! only {parseInt(currentFood.qty)} left
                    </p>
                  )}
                {currentFood.qty && parseInt(currentFood.qty) === 0 && (
                  <p className="ml-3 qty-mgs text-danger">
                    Sorry! out of stock!
                  </p>
                )}
              </div>
              <div className="my-4">
                {suggestFoods.map((recommendFood) => (
                  <RecommendFood
                    recommendFoods={recommendFood}
                    key={recommendFood.id}
                    currentFood={currentFood}
                  ></RecommendFood>
                ))}
              </div>
            </div>

            <div className="col-md-5 order-first order-md-last">
              <img
                className="img-fluid mb-4"
                src={currentFood.img}
                alt="food-image"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FoodDetails;
