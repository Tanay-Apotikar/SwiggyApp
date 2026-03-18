import React from "react";
import ReactDOM from "react-dom/client";
import { LOGO_URL } from "../../util/constants";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../util/useOnlineStatus";
import UserContext from "../../util/userContext";
import { useSelector } from "react-redux";

const Header = () => {
    const [btnNamste, setBtnNamaste] = useState("Login");

    const onlineStatus = useOnlineStatus();

    const { loggedInUser } = useContext(UserContext);
    // console.log(loggedInUser);

    // Selector
    // Subscribing to the store using a selector
    const cartItem = useSelector((store) => store.cart.items);
    // console.log(cartItem);


    return (
        <div className="flex justify-between items-center bg-green-100 shadow-lg mb-2">
            <div className="logo">
                <img className="w-40" src={LOGO_URL} />
            </div>
            <div className="nav-item">
                <ul className="flex flex-wrap gap-5 p-10">
                    <li>
                        Online Status:{onlineStatus ? "✅" : "❤️"}
                    </li>
                    <li>
                        <Link to="/">Home </Link>
                    </li>
                    <li>
                        <Link to="/about"> About Us </Link>
                    </li>
                    <li>
                        <Link to="/grocery"> Grocery </Link>
                    </li>
                    <li>
                        <Link to="/contact"> Contact Us </Link>
                    </li>
                    <li className="px-4 font-bold text-xl">
                        <Link to="/cart">  Cart({cartItem.length} items)</Link>
                    </li>
                    <button className="login" onClick={() => {
                        btnNamste === "Login" ?
                            setBtnNamaste("Logout") : setBtnNamaste("Login")

                    }}>
                        {btnNamste}
                    </button>

                    <li className="font-bold">{loggedInUser}</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;