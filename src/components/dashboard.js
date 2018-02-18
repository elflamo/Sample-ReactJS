import React from 'react';
import {dashboardBaseApi} from '../api';


class Dashboard extends React.Component{

    componentWillMount() {

        if (!localStorage.getItem("token")) {
            window.location.href = "/";
        }
        let basics = dashboardBaseApi();
    }


    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="stores">
                            <h3>Stores</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;