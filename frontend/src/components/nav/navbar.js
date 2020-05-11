import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'

class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e){
        e.preventDefault();
        this.props.logout();
    }

    getLinks(){
        if (this.props.loggedIn){
            return (
                <div className="navlinks">
                    <Link to={"/tweets"}>All Tweets</Link>
                    <Link to={"/profile"}>Profile</Link>
                    <Link to={"/new_tweet"}>Write a Tweet</Link>
                    <button className="logout" onClick={this.logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div className="navlinks">
                    <Link to={"/signup"}>Signup</Link>
                    <Link to={"/login"}>Login</Link>
                </div>
            );
        }
    }

    render(){
        return (
            <div className="navbar-container">
                <div className="logo">
                    <i className="birb fab fa-twitter"></i>
                    <h1>Twitter</h1>
                </div>
                {this.getLinks()}
            </div>
        );
    }
}

export default NavBar;