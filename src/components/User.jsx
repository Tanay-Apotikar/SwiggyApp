import React, { useEffect } from "react";
import { useState } from "react";


const User = ({name}) => {
    const [count] = useState(0);

    useEffect(() =>{

    },[]);
return (
    <div className="user-card">
        <h1>Count = {count} </h1>
        <h1>{name}</h1>
        <h3>Location: Maharashtra</h3>
        <h3>Contact: apotikartanay@gmail.com</h3>
    </div>
);
};

 export default User;