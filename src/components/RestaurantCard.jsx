import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import UserContext from "../../util/userContext";

//This is How you import Name Export
import { CDN_url } from "../../util/constants";

const RestaurantCard = (props) => {

    const { resData } = props;

    const {loggedInUser} =useContext(UserContext);

    //optioonal Chaining
    const { cloudinaryImageId, name, locality, cuisines, avgRating,veg } = resData?.info || {};
    const { costForTwo } = resData?.info || {}
    const { deliveryTime } = resData?.info?.sla || {};
    // const costNumber = parseInt(costForTwo.replace(/\D/g, ""));

    // console.log(props)
    return (
        <div className="w-[300px] flex flex-col bg-card  hover:shadow-lg border-transparent transition-all border-card-line shadow-gray-400 rounded-xl" style={{ backgroundColor: "#f0f0f0" }}>
 
                    <img className="w-full h-auto rounded-t-xl" alt="res-logo"

                        // src="https://blog.swiggy.com/wp-content/uploads/2024/03/Vada-Pav-2.jpg" 
                        src={CDN_url + cloudinaryImageId} />
              

            <div className="text-justify p-4">
                <h3 className="font-semibold text-lg text-foreground pb-1.5">{name}</h3>
                <p className="mt-1 text-muted-foreground-1">{locality}</p>
                <p className="mt-1 text-muted-foreground-1">{cuisines?.join(", ")}</p>
                <p className="mt-1 text-muted-foreground-1">{avgRating} Stars</p>
                <p className="mt-1 text-muted-foreground-1">{costForTwo}</p>
                <p className="mt-1 text-muted-foreground-1">{veg}</p>
                {/* <h4>{costNumber}</h4> */}
                <p>{deliveryTime} minutes</p>
                <p> User: {loggedInUser}</p>
            </div>
        </div>
    )
}


export const withVeg = (RestaurantCard) =>{
    return (props) =>{
        return (
            <div >
                <label className="absolute bg-[#4deb31bb] mt-2 text-black w-15 flex justify-center rounded-lg ">
                    Veg
                </label>
                <RestaurantCard {...props}/>
            </div>
        )
    }
}
export default RestaurantCard;