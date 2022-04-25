import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./restaurantListTile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";

function Items({ currentItems, props }) {
  // console.log(currentItems);
  const handleDelete = (data) => {
    // console.log(data);
    const id = data._id;
    const url = `http://localhost:3001/api/v1/restaurant/deleteRestaurant/${id}`;
    axios
      .delete(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authToken_foodie"),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status == 204) {
          console.log("Successfully deleted");
          props.setcurrentComponent("Dashboard");
        }
        if (res.status == 400) {
          console.log("Cant Delete.... ");
        }
      });
  };

  return (
    <>
      <div>
        {currentItems &&
          currentItems.map((restaurant, index) => {
            return (
              <div class="container overflow-auto">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="card border-0 mb-4 mt-4 shadow bg-white rounded">
                      <div class="d-flex p-4">
                        <div class="horizontal-card-bg-img">
                          <img src="images/restaurant.png" />
                        </div>
                        <div class="flex-fill ml-5">
                          <div class="card-body">
                            <div class="font-weight-bold mt-3">
                              {restaurant.name}
                            </div>
                            <div class="mb-3">{restaurant.address}</div>
                            <div class="mb-3">{restaurant.phoneNumber}</div>
                          </div>
                        </div>
                        <div class="horizontal-card-btn-container d-flex justify-content-center align-items-center">
                          <button
                            type="button"
                            class="btn btn-outline-primary m-3"
                          >
                            <FontAwesomeIcon
                              className="edit-icon"
                              onClick={() => {
                                props.setrestaurant(restaurant);
                                props.setcurrentComponent("Update Restaurant");
                              }}
                              size="2x"
                              // color="blue"
                              icon={faEdit}
                            />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(restaurant)}
                            class="btn btn-outline-danger m-3"
                          >
                            <FontAwesomeIcon
                              className="delete-icon"
                              size="2x"
                              // color="red"
                              icon={faTrashAlt}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default function RestaurantAdminList(props) {
  // getting restaurant list from database
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };
  // const baseurl =
  //   "http://localhost:3001/api/v1/restaurant/getAllRestaurant";
  const baseurl = "http://localhost:3001/api/v1/restaurant/getAllRestaurant";
  const [list, setlist] = useState([]);
  useEffect(() => {
    console.log("started searching");
    const fetchdata = async () => {
      await axios
        .get(baseurl, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken_foodie"),
          },
        })
        .then((response) => {
          const l = response.data.data;
          setlist((list) => [...l, list]);
        })
        .catch((errr) => {
          console.log(errr);
        });
    };
    fetchdata();
  }, []);

  // console.log(list);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;
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
  console.log(list);

  console.log(currentItems);

  return (
    <>
      <div>
        {list && (
          <div>
            <Items currentItems={currentItems} props={props} />
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< prev"
              renderOnZeroPageCount={null}
            />
          </div>
        )}
      </div>
    </>
  );
}
