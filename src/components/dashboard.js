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
        var custheaders = {Authorization: "bearer " + localStorage.getItem("token")};
        dashboardBaseApi(custheaders).then(function (response) {
            self.setState({
                active_offers:response.data.active_offers_count,
                active_stores:response.data.active_stores_count,
                total_views:response.data.total_views_offers,
                most_views:response.data.most_views_on,
                most_viewed_offer:response.data.most_viewed_offer,
                location_max_views:response.data.location_max_views
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
            most_viewed_offer:null,
            location_max_views:null,
        };
    }

    render() {

        return (
            <div className="container-fluid">
                <div className="row">
                    <SideBar />
                    <div id="id_right" className="right">
                        <div><h2>My StoreFront</h2></div>
                        <div className="counter">
                            <div className="total-views">
                                <CountUp start={0} end={this.state.active_offers} duration={4} />
                            </div>
                            <div className="total-views">
                                <CountUp start={0} end={this.state.active_stores} duration={4} />
                            </div>
                            <div className="total-views">
                                <CountUp start={0} end={this.state.most_views} duration={4} />
                            </div>
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