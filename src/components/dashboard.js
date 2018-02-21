import React from 'react';
import {dashboardBaseApi} from '../api';
import SideBar from './Sidebar';
import CountUp from 'react-countup';


class Dashboard extends React.Component{

    componentWillMount() {

        if (!localStorage.getItem("token")) {
            window.location.href = "/";
        }
        var self=this;
        dashboardBaseApi().then(function (response) {
            console.log(response.data);
            self.setState({
                active_offers:response.data.active_offers_count,
                active_stores:response.data.active_stores_count,
                total_views:response.data.total_views_offers,
                most_views:response.data.most_viewed_offer,
                most_viewed_offer:response.data.most_views_on
            });
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            active_offers:null,
            active_stores:null,
            total_views:null,
            most_views:null,
            most_viewed_offer:null
        };
    }

    render() {

        return (
            <div className="container-fluid">
                <div className="row">
                    <SideBar />
                    <div id="id_right" className="right">
                        <div><h2>My StoreFront</h2></div>
                        <div className="col-md-6 text-center">
                            <div className="total-views">
                                <CountUp start={0} end={this.state.total_views} duration={4} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;