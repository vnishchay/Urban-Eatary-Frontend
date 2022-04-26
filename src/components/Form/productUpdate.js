// user this form to create a register
// update register
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import "./productform.css";
import { useState, useEffect } from "react";

export default function UpdateProduct(props) {
    // Getting restaurant restaurantList
    const { _id, name, restaurant, category, description, price, qty, img } = props.food;

    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
    };
    const baseurl =
        "http://localhost:3001/api/v1/restaurant/getAllRestaurant";
    const [restaurantList, setlist] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            await axios
                .get(baseurl, config)
                .then((response) => {
                    const l = response.data.data;
                    setlist((restaurantList) => [...l, restaurantList]);
                })
                .catch((errr) => {
                    console.log(errr);
                });
        };
        fetchdata();
    }, []);

    // managing form
    const { register, handleSubmit, watch, errors } = useForm();
    const [submitted, setsubmitted] = useState(false);
    const onSubmit = (register) => {
        console.log("onSubmit called")
        const url = `http://localhost:3001/api/v1/food/updateItem/${_id}`;
        let r_id;
        console.log(register)
        restaurantList.forEach(element => {
            console.log(element)
            if (element.name === register.restaurant_name) {
                r_id = element;

            }
        });
        register.restaurant = r_id._id;


        axios
            .patch(url, register)
            .then((res) => {
                console.log(res.data);
                if (res.status == 201 || res.status == 200) {
                    setsubmitted(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <form className="p-5 overflow-auto" onSubmit={handleSubmit(onSubmit)}>
            <div class="form-group">
                <label for="restaurant-select">Restaurant</label>
                <select
                    class="form-control"
                    id="restaurant-select"
                    name="restaurant_name"
                    ref={register}
                >
                    {restaurantList.map((restaurant, index) => {
                        return <option>{restaurant.name}</option>;
                    })}
                </select>
            </div>
            <div class="form-group">
                <label for="product-name">Product Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="product-name"
                    name="name"
                    value={name}
                    ref={register}
                    placeholder="Pizza deilght"
                    required="true"
                />
            </div>
            <div class="form-group">
                <label for="category">Category</label>
                <input
                    type="text"
                    class="form-control"
                    id="category"
                    value={category}
                    name="category"
                    ref={register}
                    placeholder="Pizza"
                />
            </div>
            <div class="form-group">
                <label for="image-link">Image Link</label>
                <input
                    type="text"
                    class="form-control"
                    id="image-link"
                    name="img"
                    value={img}
                    ref={register}
                    placeholder=""
                    required="true"
                />
            </div>
            <div class="form-group">
                <label for="quantity">Quantity</label>
                <input
                    type="text"
                    class="form-control"
                    id="quantity"
                    name="qty"
                    value={qty}
                    ref={register}
                    placeholder="1"
                />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea
                    class="form-control"
                    id="description"
                    rows="2"
                    value={description}
                    name="description"
                    ref={register}
                ></textarea>
            </div>
            <div class="form-group">
                <label for="exampleFormControlInput1">Price</label>
                <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    name="price"
                    value={price}
                    ref={register}
                    placeholder="₹ 0"
                />
            </div>
            <button type="button btn-lg" class="btn btn-outline-success">
                Update Product
            </button>
            {submitted == true ? <h2> Product Updated</h2> : <div />}
        </form>
    );
}
