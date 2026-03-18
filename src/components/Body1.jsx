import ReactDOM from "react-dom/client";
import RestaurantCard from "./RestaurantCard";
import React, { useState, useEffect } from "react";
import resList from "../../util/mokData";
import Shimmer from "./Shimmer";




const Body = () => {


    const [restaurantList, setRestaurantList] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);

    const [searchText, setSearchText] = useState("");

    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);

    // const [visibleCount, setVisibleCount] = useState(10);

    useEffect(() => {
        fetchRestaurant();
    }, []);

    const fetchRestaurant = async () => {
        if (loading) return;
        setLoading(true);

        const response = await fetch(
            // `https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.579343&lng=73.9089168&offset=${offset}&page_type=DESKTOP_WEB_LISTING`
            // "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.587282&lng=74.008799&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
            `https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.587282&lng=74.008799&offset=${offset}&page_type=DESKTOP_WEB_LISTING`
        );

        const json = await response.json();

        const restaurants =
            json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

        // setRestaurantList(prev => [...prev, ...restaurants]);
        // setFilteredRestaurant(prev => [...prev, ...restaurants]);


        setRestaurantList(prev => {
            const existingIds = new Set(prev.map(r => r.info.id));
            const uniqueNew = restaurants.filter(
                r => !existingIds.has(r.info.id)
            );
            return [...prev, ...uniqueNew];
        });

        setFilteredRestaurant(prev => {
            const existingIds = new Set(prev.map(r => r.info.id));
            const uniqueNew = restaurants.filter(
                r => !existingIds.has(r.info.id)
            );
            return [...prev, ...uniqueNew];
        });

        setOffset(prev => prev + restaurants.length);


        // setRestaurantList(restaurants);
        // setFilteredRestaurant(restaurants);
        setLoading(false);
    };


    const [visibleCount, setVisibleCount] = useState(8);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 200
            ) {
                // fetchRestaurant();
                setVisibleCount(prev => prev + 8);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    //Whenever state component updated, react trigger a reconciliation cycle(re-render the component)
    console.log("Body Render")


    // const fetchData = async () => {
    //     const data = await fetch
    //         // ("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING");
    //         ("https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.579343&lng=73.9089168&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")

    //     const json = await data.json();
    //     // console.log(json);


    //     const restaurants = json.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    //     // const 

    //     setRestaurantList(restaurants || []);
    //     setFilteredRestaurant(restaurants || [])
    //     // console.log("Tanay", restaurants);
    // }


    const handleSearch = () => {
        const searchItem = restaurantList.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredRestaurant(searchItem);
    }

    return restaurantList.length === 0 ? (<Shimmer />) : (
        <div className="body">

            <div className="filter">
                <div className="search">
                    <input id="search " type="text" className="searchbox" value={searchText}
                        onChange={(e) => { setSearchText(e.target.value); }}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                handleSearch();
                            }
                        }} />
                    <button className="search-btn"
                        onClick={handleSearch}
                    >Search</button>
                </div>

                <button className="filter-btn"
                    onClick={() => {
                        const filterList = filteredRestaurant.filter((res) => res.info.avgRating > 4);
                        setFilteredRestaurant(filterList);
                        // console.log(filterList);
                    }}
                >Top Rated Restraunts </button>


            </div>
            <div className="filter">
                <button className="filter-btn"
                    onClick={() => {
                        // const seeAll = restaurantList.filter((res)=>res.data );
                        setFilteredRestaurant(restaurantList);
                    }}
                >See All
                </button>
            </div>
            <div className="res-container">

                {filteredRestaurant.slice(0, visibleCount).map((restaurant, index) =>
                    (<RestaurantCard key={restaurant.info.id} resData={restaurant} />)
                )
                }
            </div>

        </div >
    )
}

export default Body;