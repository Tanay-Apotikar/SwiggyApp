import React, { useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../../util/useRestaurantMenu";
import { CDN_url } from "../../util/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../../util/cartSlice";
import RestaurantCatogaory from "./RestaurantCategory";

const RestaurantMenue = () => {

    const { resId } = useParams();

    const resInfo = useRestaurantMenu(resId);

    const [showIndex, setShowIndex] = useState();


    const dispatch = useDispatch();

    if (resInfo === null) {
        return (<Shimmer />);
    }

    // Live Api Data
    // const { name, locality, costForTwo, cuisines } = resInfo?.data?.cards?.card?.[2]?.card?.card?.info || {};

    const { itemCards } = resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1].card?.card || {};

    // Namste React Api Data
    const { name, locality, costForTwo, cuisines, cloudinaryImageId } = resInfo?.cards?.[2]?.card?.card?.info || {};

    const category = resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter((c) =>
        c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );



    const handleAddItem = (item) => {
        //Dispatch An Action 
        dispatch(addItem(item));
    };

    return (
        <div className="text-center m-auto align-middle items-center ">
            {/* <img className="text-center w-s justify-center" src={CDN_url + cloudinaryImageId} /> */}
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            {/* <h2>{type}</h2> */}
            <p>{costForTwo}</p>
            <p className="font-bold text-lg">{cuisines.join(",")} </p>
            <p>Address:- {locality}</p>

            {/* categories accordions */}

            {category.map((categories, index) => (
                <RestaurantCatogaory key={categories?.card?.card?.title} data={categories?.card?.card}
                    // showItem = {index === showIndex  ? true : false }
                    // setShowIndex={()=> setShowIndex(index)}
                    showItem={index === showIndex}
                    setShowIndex={() =>
                        setShowIndex(showIndex === index ? null : index)}
                        />
            ))}

            <ul>

                {itemCards.map(item =>
                    <li key={item.card.info.id}>
                        {item.card.info.name} - Rs.{item.card.info.price / 100}

                        <button className="border cursor-pointer"
                            onClick={() => handleAddItem(item)}> Add +</button>
                    </li>)}



            </ul>
        </div >
    );
};

export default RestaurantMenue; 