import React from 'react';
import SideBar from './Sidebar';


class storesPage extends React.Component{

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <SideBar />
                    <div id="id_right" className="right">
                        <h2>Stores Page</h2>
                    </div>
                </div>
            </div>
        );
    }

}

export default storesPage;