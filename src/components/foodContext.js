import axios from 'axios';
import React, { useState } from 'react'

export default function () {
    const [food, setfood] = useState([]);
    const fetchSearch = () => {
        axios.get("http://localhost:3001/api/v1/food/foodItem/")
    }
    return {

    }
}
