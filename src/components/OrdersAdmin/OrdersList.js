import firebase from "firebase";
import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import OrderTile from "./OrderTile";
import ReactPaginate from "react-paginate";
import "./OrdersList.css";
import axios from "axios";

function Items({ currentItems }) {
  return (
    <div>
      {currentItems &&
        currentItems.map((orders, index) => {
          return (
            <div class="container overflow-auto">
              {orders && (
                <div class="row">
                  <OrderTile orders={orders} />
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default function OrdersList() {
  const [list, setlist] = useState([]);
  // const ordersRef = firebase.firestore().collection("orders");
  useEffect(() => {
    const fetch = async () => {
      axios
        .get("http://localhost:3001/api/v1/order/allOrders", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken_foodie"),
          },
        })
        .then((res) => {
          // console.log(res.data.data);
          setlist(res.data.data);
        });
    };
    fetch();
  }, []);

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;
  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(list.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, list]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % list.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      {list && (
        <div>
          <Items currentItems={currentItems} />
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </div>
      )}
    </>
  );
}
