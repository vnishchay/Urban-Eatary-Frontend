import React, { useEffect } from "react";
import "./Shipment.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import firebase from "../firebase-config";
import axios from "axios";

const Shipment = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { toDoor, road, flat, businessName, address } = props.deliveryDetails;
  const { orderID, deliveryDetails } = props.orderDetails;
  const userid = '6249a3de3de8158d072584b9'
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (register) => {
    props.deliveryDetailsHandler(register);
    onOrderComplete();
  };
  const subTotal = props.cart.reduce((acc, crr) => {
    return acc + crr.price.toFixed(1) * crr.quantity * 40;
  }, 0);

  const totalQuantity = props.cart.reduce((acc, crr) => {
    return acc + crr.quantity;
  }, 0);

  const idlist = [];
  props.cart.forEach(element => {
    idlist.push({ itemId: element._id, quantity: 1 });
  });
  const tax = (subTotal / 100) * 5;
  const deliveryFee = totalQuantity && 40;
  const grandTotal = subTotal + tax + deliveryFee;


  function handlePayment() {
    props.paymentHandler(grandTotal);
    props.clearCart();
  }

  async function onOrderComplete() {
    try {
      const base_url = "http://localhost:3001/api/v1/order"
      const data = {
        restaurant: props.cart[0].restaurant,
        foodItems: idlist,
        totalPrice: subTotal,
        address: "Sricity , Indianapolis"
      };
      axios.post(base_url + '/placeOrder', data, {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem("authToken_foodie")
        },
      }).then((res) => {
        console.log(res)
      })

    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div className="shipment container my-5">
      <div className="row">
        <div className="col-md-5">
          <h4>Edit Delivery Details</h4>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)} className="py-5">
            <div className="form-group">
              <input
                name="toDoor"
                className="form-control"
                ref={register({ required: true })}
                defaultValue={toDoor}
                placeholder="Delivery To Door"
              />
              {errors.toDoor && (
                <span className="error">This Option is required</span>
              )}
            </div>
            <div className="form-group">
              <input
                name="road"
                className="form-control"
                ref={register({ required: true })}
                defaultValue={road}
                placeholder="Road No"
              />
              {errors.road && (
                <span className="error">Road No is required</span>
              )}
            </div>

            <div className="form-group">
              <input
                name="flat"
                className="form-control"
                ref={register({ required: true })}
                defaultValue={flat}
                placeholder="Flat, Suite or Floor"
              />
              {errors.flat && (
                <span className="error">Flat, Suite or Floor is required</span>
              )}
            </div>

            <div className="form-group">
              <input
                name="businessName"
                className="form-control"
                ref={register({ required: true })}
                defaultValue={businessName}
                placeholder="Business name"
              />
              {errors.businessName && (
                <span className="error">Business name is required</span>
              )}
            </div>

            <div className="form-group">
              <input
                name="phoneNumber"
                className="form-control"
                ref={register({ required: true })}
                placeholder="Phone Number"
              />
              {errors.phoneNumber && (
                <span className="error">Phone Number is required</span>
              )}
            </div>

            <div className="form-group">
              <textarea
                name="address"
                ref={register({ required: true })}
                defaultValue={address}
                placeholder="Address"
                className="form-control"
                cols="30"
                rows="2"
              ></textarea>
              {errors.address && (
                <span className="error">Password is required</span>
              )}
            </div>

            <div className="form-group">
              <button className="btn btn-danger btn-block" type="submit">
                Save & Continue
              </button>
            </div>
          </form>
        </div>
        <div className="offset-md-1 col-md-5">
          <div className="restaurant-info mb-3">
            <h4>
              Form <strong> Star Kabab And Restaura</strong>
            </h4>
            <h5>Arriving in 20-30 min</h5>
            <h5>107 Rd No 9</h5>
          </div>

          {props.cart.map((item) => (
            <div className="single-checkout-item mb-3 bg-light rounded d-flex align-items-center justify-content-between p-3">
              <img
                width="140px"
                className="moor-images"
                src={item.img}
                alt="food-image"
              />
              <div className="px-4">
                <h6>{item.name}</h6>
                <h4 className="text-danger">₹{item.price.toFixed(1) * 40}</h4>
                <p>
                  <small>Delivery free</small>
                </p>
              </div>

              <div className="checkout-item-button ml-3 btn">
                <button
                  onClick={() =>
                    props.checkOutItemHandler(item.id, item.quantity + 1)
                  }
                  className="btn font-weight-bolder"
                >
                  +
                </button>

                <button className="btn bg-white rounded">
                  {item.quantity}
                </button>

                {item.quantity > 0 ? (
                  <button
                    onClick={() =>
                      props.checkOutItemHandler(item.id, item.quantity - 1)
                    }
                    className="btn font-weight-bolder"
                  >
                    -
                  </button>
                ) : (
                  <button className="btn font-weight-bolder">-</button>
                )}
              </div>
            </div>
          ))}

          {!props.cart.length && (
            <h3 className="py-3">
              No Items Added <a href="/"> Keep Shopping</a>
            </h3>
          )}

          <div className="cart-calculation">
            <p className="d-flex justify-content-between">
              <span>Sub Total: {totalQuantity} Item</span>
              <span>₹{subTotal.toFixed(1)}</span>
            </p>

            <p className="d-flex justify-content-between">
              <span>Tax</span>
              <span>₹{tax.toFixed(1)}</span>
            </p>

            <p className="d-flex justify-content-between">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </p>

            <p className="h5 d-flex justify-content-between">
              <span>Total</span>
              <span>₹{grandTotal.toFixed(1)}</span>
            </p>

            {totalQuantity ? (
              toDoor && road && flat && businessName && address ? (
                <Link
                  to={{
                    pathname: "/payment",
                    state: orderID,
                  }}
                >
                  <button
                    onClick={handlePayment}
                    className="btn btn-block btn-danger"
                  >
                    Check Out Your Food
                  </button>
                </Link>
              ) : (
                <button disabled className="btn btn-block btn-secondary">
                  Check Out Your Food
                </button>
              )
            ) : (
              <button disabled className="btn btn-block btn-secondary">
                Nothing to Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipment;
