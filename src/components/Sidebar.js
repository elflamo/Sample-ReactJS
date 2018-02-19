import React from 'react';

class SideBar extends React.Component{

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout = event => {
        localStorage.clear();
        window.location.href = "/";
    };

    render() {
        return (
            <div>
                <div className="sidebar">
                    <div>
                        <ul>
                            <li><a>Home</a></li>
                            <li><a href="#stores" data-toggle="collapse">Stores</a></li>
                            <li><a href="#offers" data-toggle="collapse">Offers</a></li>
                            <li><a href="#views" data-toggle="collapse">Views</a></li>
                            <li><a onClick={this.logout}>Logout</a></li>
                        </ul>
                        <div className="collapse" id="stores">Hello</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SideBar;