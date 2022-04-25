import React from "react";
import { useState } from "react";
import "./StripePayment.css";
import StripeContainer from "./StripeContainer";
import { withAuthenticationRequired } from "@auth0/auth0-react";

function StripeComponent(props) {
  const [showItem, setShowItem] = useState(false);
  return (
    <div className="App">
      {showItem ? (
        <>
          <h2>Your card Details</h2>
          <StripeContainer grandTotal={props.grandTotal} />
        </>
      ) : (
        <>
          <h1>Total payable amount</h1>
          <h3>₹{props.grandTotal}</h3>
          <button className="stripeButton" onClick={() => setShowItem(true)}>
            Make Payment
          </button>
        </>
      )}
    </div>
  );
}
export default StripeComponent
