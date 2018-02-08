import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import './containers/home.css';


class Customroutes extends React.Component{
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/dashboard" component={Dashboard}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Customroutes;