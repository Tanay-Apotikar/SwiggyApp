import React from "react";
class UserClass extends React.Component {
    constructor(props) {
        super(props)


        this.state = {
            userInfo:{
                name:"Dummy",
                location:"Defloction",
                avatar_url: "http/avatr-photo"

            }
        };

        //console.log(this.props.name + "Child Constructor");
    }
    async componentDidMount() {
        // console.log(this.props.name + "Child Component did Mount");
        const data = await fetch('https://api.github.com/users/Tanay-Apotikar');
        const json = await data.json();

        this.setState({
            userInfo:json
        })

        console.log(json)
    }
    render() {
      const {name, location,avatar_url} = this.state.userInfo;
        //console.log(this.props.name + "Child Render");
        return (
            <div className="user-card">
                <img src={avatar_url}/>
                <h3>Name = {name}</h3>
                <h3>Location:{location}</h3>
                <h3>Contact: apotikartanay@gmail.com</h3>
            </div>
        );
    };
};

export default UserClass;