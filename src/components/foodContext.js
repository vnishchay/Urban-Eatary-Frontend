import axios from 'axios';
import React, { useState } from 'react'

export default function () {
    const [food, setfood] = useState([]);
    const fetchSearch = () => {
        axios.get("https://urban-eatary-backend.herokuapp.com/api/v1/food/foodItem/")
    }
    return {

    }
}
