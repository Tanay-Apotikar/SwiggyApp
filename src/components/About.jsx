import User from "./User";
import UserClass from "./UserClass"
import React, { Component } from "react";
import UserContext from "../../util/userContext";
class About extends Component {
    constructor(props) {
        super(props)

        //console.log("Parent Constructor");
    }

    componentDidMount() {
        //console.log("Parent Component Did mounnt");
    }

    render() {
        //console.log("Parent Render");
        return (

            <div>
                <h1>About</h1>
                <div>
                    Loggedin User
                    <UserContext.Consumer>
                        {({loggedInUser}) =>
                        (<h1 className="text-xl font-bold">
                            {loggedInUser}
                        </h1>)
                        }
                    </UserContext.Consumer>
                </div>
                <h2>This is Tanay From About Us Page</h2>
                {/* <User name={"Tanay Apotikar(Function)"}></User> */}
                <UserClass name={"First Child (Class)"} location={"Pune Class"} />
                {/* <UserClass name={"Second Child (Class)"} location={"Wardha"} /> */}

            </div>
        );
    }

};

export default About;