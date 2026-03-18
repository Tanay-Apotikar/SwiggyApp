import React from "react";
import { useEffect, useState } from "react"

const practice = () => {
    const [restaurantList, SetRestaurantList] = useState([]);
    const [filteredRestaurant, SetFilteredRestaurant] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(`https://namastedev.com/api/v1/listRestaurants`);

        const json = await data.json();

        const restaurants = json.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

        SetRestaurantList(restaurants);
        SetFilteredRestaurant(restaurants);

    }


    const handleSearch = ()=>{
        const searchItem = restaurantList.filter((res)=>res.info.name.toLoewrCase().includes.(searchText.toLoewrCase()));
        SetFilteredRestaurant(searchItem);
    }






}