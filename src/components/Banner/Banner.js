import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Banner.css'
import { useEffect } from 'react';
// import SearchResult from '../SearchResult/SearchResult';
import axios from 'axios';
import FoodItem from '../FoodItem/FoodItem';

const Banner = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const getQuery = event => setSearchQuery(event.target.value);
    const [searchResult, SetSearchResult] = useState([]);

    const handleSearch = async () => {
        window.scrollBy(0, 525)
        if (searchQuery !== undefined) {
            await axios.get(`http://localhost:3001/api/v1/food/search/${searchQuery}`, {
                headers: {
                    authorization:
                        "Bearer " + localStorage.getItem("authToken_foodie"),
                },
            }).then((res) => {
                SetSearchResult([]);
                res.data.data.forEach(element => {
                    SetSearchResult(searchResult => [...searchResult, element])
                });
                console.log(searchResult)
            })
        }
    }

    return (
        <>
            <section className='banner d-flex align-items-center text-center'>
                <div className='container'>
                    <div className='search-box col-md-6 my-5 mx-auto'>
                        <input
                            type="text"
                            id="query"
                            onChange={getQuery}
                            className='form-control'
                            placeholder='Search Food Item'
                        />
                        <Link to={'/search=' + searchQuery}>
                            <button
                                onClick={() => {
                                    window.scrollBy(0, 525)
                                    handleSearch()
                                }
                                }
                                className='btn btn-danger search-btn btn-rounded'
                            >
                                Search
                            </button>
                        </Link>
                    </div>

                    <h1 className='text-white'>Best Food Waiting For Your Belly</h1>
                </div>


            </section>
            <><div></div><section className="food-area my-5">
                <div className="container">
                    <h3 className="text-center search-res-title">Search Result</h3>
                    {searchResult !== undefined && <div className="row my-5">
                        {searchResult.map(food => <FoodItem key={food._id} food={food}></FoodItem>)}
                        {searchResult.length === 0 && <h1 className="col-12 display-5 text-center">No food found!</h1>}
                    </div>
                    }

                    <div className="text-center">
                        <Link to="/">
                            <button className="btn btn-danger">See Our All Foods</button>
                        </Link>
                    </div>
                </div>
            </section></>
        </>
    );
};

export default Banner;