import React from 'react';
import {dashboardBaseApi} from '../api';
import SideBar from './Sidebar';


class Dashboard extends React.Component{

    componentWillMount() {

        if (!localStorage.getItem("token")) {
            window.location.href = "/";
        }
        let basics = dashboardBaseApi();
    }

    constructor(props) {
        super(props);
        // this.toggleSideBar = this.toggleSideBar.bind(this);
    }


    // toggleSideBar = event => {
    //     this.setState({
    //         sidebar:!this.state.sidebar,
    //         open:!this.state.open
    //     });
    // };


    render() {

        return (
            <div>
                <SideBar />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="stores">
                                <h3>My StoreFront</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;