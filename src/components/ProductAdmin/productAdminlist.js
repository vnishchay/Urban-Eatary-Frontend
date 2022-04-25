import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./restauranttile.css";

function Items({ currentItems, props }) {
  const handleDelete = (data) => {
    const id = data._id;
    const url = `http://localhost:3001/api/v1/food/deleteItem/${id}`;
    axios.delete(url, {
      id: id
    },
      {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem("authToken_foodie")
        },
      },
    ).then((res) => {
      if (res.status == 200) {
        props.setcurrentComponent("Dashboard");
      }
      if (res.status == 400) {
        console.log("Cant Delete.... ");
      }
    });
  };

  return (
    <div>
      {currentItems &&
        currentItems.map((food, index) => {
          return (
            <div class="container overflow-auto">
              <div class="row">
                <div class="col-lg-12">
                  <div class="card border-0 mb-4 mt-4 shadow bg-white rounded">
                    <div class="d-flex p-4">
                      <div class="horizontal-card-bg-img">
                        <img className="card-img" src={food.img} />
                      </div>
                      <div class="flex-fill ml-5">
                        <div class="card-body">
                          <div class="font-weight-bold mt-3">
                            {food.name}
                          </div>
                          <div class="mb-3">{food.price}</div>
                          <div class="mb-3">{food.category}</div>
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
                              props.setfood(food);
                              props.setcurrentComponent("Update Product")
                            }
                            }
                            size="2x"
                            // color="blue"
                            icon={faEdit}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(food)}
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
  );
}

export default function ProductAdminList(props) {
  const config = {
    headers: {
      'authorization': 'Bearer ' + localStorage.getItem("authToken_foodie")
    },
  };
  const baseurl = "http://localhost:3001/api/v1/food/foodItem";
  const [list, setlist] = useState([]);
  useEffect(() => {
    console.log("started searching");
    const fetchdata = async () => {
      await axios
        .get(baseurl, config)
        .then((response) => {
          const l = response.data.data;
          console.log(l);
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
          <Items currentItems={currentItems} props={props} />
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </div>
      )}
    </>
  );
}
