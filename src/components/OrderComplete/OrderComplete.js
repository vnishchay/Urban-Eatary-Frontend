import React, { useEffect, useState } from "react";
import MapImg from "../../images/img/map.png";

import Rider from '../../images/img/rider.png';
import RiderHelmet from '../../images/img/helmet.png';
import axios from "axios";

const OrderComplete = (props) => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { flat, road } = props.deliveryDetails;
  const { orderID } = props.orderDetails;
  const userid = "6249a3de3de8158d072584b9";
  const [current_user, setcurrent_user] = useState();
  useEffect(() => {
    // axios.get('http://localhost:3001/api/v1/food/')
  })


  const cancelorder = () => {

  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8">
          <img className="img-fluid" src={MapImg} alt="" />
        </div>
        <div className="col-md-4 pl-md-5">
          <div className="bg-light p-3 rounded">
            <img className="w-25 ml-5" src={Rider} alt="" />
            <div className="bg-white  rounded p-3 my-3">
              <div>
                <h5>Your OrderID</h5>
                <p>{orderID}</p>
              </div>
              <div>
                <h5>Your Location</h5>
                <p>{flat}, {road}</p>
              </div>
              <div>
                <h5>Shop Address</h5>
                <p>Star Kabab and Restaura</p>
              </div>
            </div>
            <h1>09:00</h1>
            <p>Estimated Delivery</p>

            <div className="bg-white rounded p-3 d-flex">
              <img className="w-25 mr-2" src={RiderHelmet} alt="" />
              <div>
                <h6>Hamim</h6>
                <p>Your Rider</p>
              </div>
            </div>

            <button className="btn btn-block my-3 btn-info">
              <a class="text-white" href="tel:+917355153249">
                Contact
              </a>
            </button>

            <button className="btn btn-block my-3 btn-danger" onClick={cancelorder}>Cancel Order</button>


          </div>
        </div>
      </div>

    </div>

  );
};

export default OrderComplete;
