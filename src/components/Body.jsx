import RestaurantCard, { withVeg } from "./RestaurantCard";
import React, { useState, useEffect, useContext } from "react";
import resList from "../../util/mokData";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../util/useOnlineStatus";
import Grocery from "./Grocery";
import UserContext from "../../util/userContext";




const Body = () => {
    //Local State Veriable :- Super PowerFull
    // const [restaurantList, setRestaurantList] = useState(resList);
    // const [filterList, setFilterList] = useState(resList);

    const [restaurantList, setRestaurantList] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);

    const [searchText, setSearchText] = useState("");

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const RestaurantWithVeg = withVeg(RestaurantCard);



    //Whenever state component updated, react trigger a reconciliation cycle(re-render the component)
    // console.log("Body Render")


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(
            "https://namastedev.com/api/v1/listRestaurants");
        const json = await data.json();




        // console.log(json,"live Data")


        //For Local Api Data
        const restaurants = json.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

        //Fro Live Api Data
        // const restaurants = json.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        console.log(restaurants,"new data");

        setRestaurantList(restaurants || []);
        setFilteredRestaurant(restaurants || [])

    }

    const onlinestatus = useOnlineStatus();


    if (onlinestatus == false)
        return (
            <h1> Looks like you're Offline!! Please Check your internet connection</h1>
        );



    const handleSearch = () => {
        const searchItem = restaurantList.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredRestaurant(searchItem);
    }


    const { setUserName, loggedInUser } = useContext(UserContext);

    return restaurantList.length === 0 ? (<Shimmer />) : (
        <div className="body">

            <div className="w-full flex flex-wrap justify-between p-5">
                <div className="flex items-center justify-start ml-10">
                    <input id="search " type="text"
                        className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        value={searchText}
                        onChange={(e) => { setSearchText(e.target.value); }}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                handleSearch();
                            }
                        }} />
                    <button className="rounded-md bg-orange-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-orange-500 focus:shadow-none active:bg-slate-700 hover:bg-orange-400 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                        onClick={handleSearch}
                    >Search</button>

                    <div className="pl-10">
                        <label>User : </label>
                        <input className="border border-black pl-2 p-0.5"
                            value={loggedInUser}
                            onChange={(e) => setUserName(e.target.value)} />
                    </div>
                </div>

                <div className="flex flex-wrap">
                    <div className="pl-10">
                        <button className="rounded-md py-2 px-4 bg-slate-500 border border-transparent transition-all text-center text-sm text-white ransition-all shadow-md hover:shadow-lg  hover:bg-slate-300 hover:text-black"
                            onClick={() => {
                                const filterList = filteredRestaurant.filter((res) => res.info.avgRating > 4.5);
                                setFilteredRestaurant(filterList);
                                console.log(filterList);
                            }}
                        >Top Rated Restraunts </button>
                    </div>


                    <div className="pl-10">
                        <button className="rounded-md py-2 px-4 bg-slate-500 border border-transparent text-center transition-all text-sm text-white ransition-all shadow-md hover:shadow-lg  hover:bg-slate-300 hover:text-black"
                            onClick={() => {
                                // const seeAll = restaurantList.filter((res)=>res.data );
                                setFilteredRestaurant(restaurantList);
                            }}
                        >See All
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap justify-evenly gap-4">

                {filteredRestaurant.map((restaurant, index) =>
                (
                    <Link key={restaurant.info.id} to={"restaurant/" + restaurant.info.id}>


                        {
                            restaurant.info?.veg ? (<RestaurantWithVeg resData={restaurant} />

                            ) : (<RestaurantCard resData={restaurant} />)
                        }

                    </Link>
                )
                )
                }
            </div>

        </div >
    )
}

export default Body;