import React from 'react';
import SideBar from './Sidebar';
import {storeListApi} from '../api';

class storesPage extends React.Component{

    componentWillMount() {
        var custheaders = {Authorization: "bearer " + localStorage.getItem("token")};
        var self = this;
        storeListApi(custheaders).then(function (response) {
            console.log(response.data);
        });

    }

    constructor(props) {
        super(props);
        this.state = {store_list:[]};
    }

    render() {

        return (
            <div className="container-fluid">
                <div className="row">
                    <SideBar />
                    <div id="id_right" className="right">
                        <h2>Stores Page</h2>
                        <div className="pd20">
                            <div className="col-md-12">
                                <h3>List of Stores</h3>
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>Location</th>
                                        <th>City</th>
                                        <th>Subscribed</th>
                                        <th>Offers</th>
                                        <th>Views</th>
                                        <th>Buys</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.store_list}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default storesPage;