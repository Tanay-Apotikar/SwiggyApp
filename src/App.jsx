import React, { lazy, Suspense, useEffect, useReducer, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/contact";
import Error from "./components/Error";
import RestaurantMenue from "./components/RestaurantMenue";
import UserContext from "../util/userContext";
import { Provider } from "react-redux"
import appStore from "../util/appStore";
import { useParams } from "react-router-dom";
import Cart from "./components/cart";


// import Body1 from "./components/Body1";


const Grocery = lazy(() => import("./components/Grocery"));
// console.log(Grocery)
//We can give in line css like this also
const styleCard = {
    backgroundColor: "#f0f0f0",
};

//Layx Loading
//on Demand Loding 



const AppLayout = () => {

    const [userName, setUserName] = useState();

    //authentication 
    useEffect(() => {
        const data = {
            name: "Tanay Apotikar"
        }
        setUserName(data.name);
    }, [])
    return (

        <Provider store={ appStore}>
            <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
                <div className="app">

                    <Header />

                    <Outlet />
                </div >
            </UserContext.Provider >
        </Provider>
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/restaurant/:resId",
                element: <RestaurantMenue />,
            },
            {
                path: "/grocery",
                element: <Suspense fallback={<h1>Loading...</h1>}> <Grocery /> </Suspense>,
            },
            {
                path: "/cart",
                element:<Cart></Cart>,
            }
        ],
        errorElement: <Error />
    },

]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />)
// root.render(<HeadingComponent />);