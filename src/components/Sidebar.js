import React from 'react';
import {Redirect, Link} from 'react-router-dom';

class SideBar extends React.Component{

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.state = {logout:false}
    }

    logout = event => {
        event.preventDefault();
        localStorage.clear();
        this.setState({logout:true});
    };

    openNav = event => {
        document.getElementById("id_left").style.width = "150px";
    };

    closeNav = event => {
        document.getElementById("id_left").style.width = "49px";
    };

    render() {
        return (
            <div>
                <div id="id_left" className="left" onMouseOver={this.openNav} onMouseOut={this.closeNav}>
                    <ul>
                        <Link to="/dashboard">
                            <li className="item-menu">
                                <i className="fa fa-home" aria-hidden="true"></i>
                                <span className="menu">Home</span>
                            </li>
                        </Link>
                        <Link to="/stores">
                            <li className="item-menu">
                                <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                                <span className="menu">Stores</span>
                            </li>
                        </Link>
                        <Link to="/offers">
                            <li className="item-menu">
                                <i className="fa fa-tags" aria-hidden="true"></i>
                                <span className="menu">Offers</span>
                            </li>
                        </Link>
                        <Link to="/subscription">
                            <li className="item-menu">
                                <i className="fa fa-credit-card-alt" aria-hidden="true"></i>
                                <span className="menu">Subscriptions</span>
                            </li>
                        </Link>
                        <Link to="/contactus">
                            <li className="item-menu">
                                <i className="fa fa-question-circle" aria-hidden="true"></i>
                                <span className="menu">Contact Us</span>
                            </li>
                        </Link>
                        <a onClick={this.logout}>
                            <li className="item-menu">
                                <i className="fa fa-sign-out" aria-hidden="true"></i>
                                <span className="menu">Logout</span>
                            </li>
                        </a>
                    </ul>
                </div>
                {this.state.logout ? <Redirect to="/" />: null}
            </div>
        );
    }
}

export default SideBar;