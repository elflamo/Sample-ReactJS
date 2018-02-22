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
                location_max_views:response.data.location_max_views,
                total_offers_buyed:response.data.total_offers_buyed,
                most_buyed_offer:response.data.most_buyed_offer,
                most_buys_on:response.data.most_buys_on,
                location_max_buyed:response.data.location_max_buyed,
                duration_max_views_start:response.data.durations.views_start_date,
                duration_max_views_end:response.data.durations.views_end_date,
                duration_max_buys_start:response.data.durations.buys_start_date,
                duration_max_buys_end:response.data.durations.buys_end_date
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
            total_offers_buyed:null,
            most_buyed_offer:null,
            most_buys_on:null,
            location_max_buyed:null,
            duration_max_views:null,
            duration_max_buys:null
        };
    }

    render() {

        return (
            <div className="container-fluid">
                <div className="row">
                    <SideBar />
                    <div id="id_right" className="right">
                        <h2>Welcome to My StoreFront</h2>
                        <div className="pd20">
                            <div className="col-md-3">
                                <div className="panel info-box">
                                    <div className="panel-body">
                                        <div className="stats">
                                            <p>{this.state.most_viewed_offer}</p>
                                            <span>Most Viewed Offer</span>
                                        </div>
                                        <div className="icon">
                                            <i className="fa fa-tags" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="panel info-box">
                                    <div className="panel-body">
                                        <div className="stats">
                                            <p><CountUp start={0} end={this.state.most_views} duration={4} /></p>
                                            <span>Total Views on {this.state.most_viewed_offer}</span>
                                        </div>
                                        <div className="icon">
                                            <i className="fa fa-eye" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="panel info-box">
                                    <div className="panel-body">
                                        <div className="stats">
                                            <p><CountUp start={0} end={this.state.total_views} duration={4} /></p>
                                            <span>Total Views</span>
                                        </div>
                                        <div className="icon">
                                            <i className="fa fa-eye" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="panel info-box">
                                    <div className="panel-body">
                                        <div className="stats">
                                            <p>{this.state.location_max_views}</p>
                                            <span>Location with max views</span>
                                        </div>
                                        <div className="icon">
                                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="panel info-box">
                                    <div className="panel-body">
                                        <div className="stats">
                                            <p>{this.state.most_buyed_offer}</p>
                                            <span>Most Buyed Offer</span>
                                        </div>
                                        <div className="icon">
                                            <i className="fa fa-tags" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="panel info-box">
                                    <div className="panel-body">
                                        <div className="stats">
                                            <p><CountUp start={0} end={this.state.most_buys_on} duration={4} /></p>
                                            <span>Total Buys on {this.state.most_buyed_offer}</span>
                                        </div>
                                        <div className="icon">
                                            <i className="fa fa-money" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="panel info-box">
                                    <div className="panel-body">
                                        <div className="stats">
                                            <p><CountUp start={0} end={this.state.total_offers_buyed} duration={4} /></p>
                                            <span>Total Buys</span>
                                        </div>
                                        <div className="icon">
                                            <i className="fa fa-money" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="panel info-box">
                                    <div className="panel-body">
                                        <div className="stats">
                                            <p>{this.state.location_max_buyed}</p>
                                            <span>Location with max buys</span>
                                        </div>
                                        <div className="icon">
                                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="panel info-box">
                                    <div className="panel-body">
                                        <div className="stats">
                                            <p><CountUp start={0} end={this.state.active_offers} duration={4} /></p>
                                            <span>Active Offers</span>
                                        </div>
                                        <div className="icon">
                                            <i className="fa fa-tags" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="panel info-box">
                                    <div className="panel-body">
                                        <div className="stats">
                                            <p><CountUp start={0} end={this.state.active_stores} duration={4} /></p>
                                            <span>Active Stores</span>
                                        </div>
                                        <div className="icon">
                                            <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="panel info-box">
                                    <div className="panel-body">
                                        <div className="stats">
                                            <p>{this.state.duration_max_buys_start} to {this.state.duration_max_buys_end}</p>
                                            <span>Duration with Max Buys</span>
                                        </div>
                                        <div className="icon">
                                            <i className="fa fa-calendar" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="panel info-box">
                                    <div className="panel-body">
                                        <div className="stats">
                                            <p>{this.state.duration_max_views_start} to {this.state.duration_max_views_end}</p>
                                            <span>Duration with Max Views</span>
                                        </div>
                                        <div className="icon">
                                            <i className="fa fa-calendar" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;