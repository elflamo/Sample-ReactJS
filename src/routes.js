import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import MainLogin from './components/loginPage';
import Dashboard from './components/dashboard';
import storePage from './components/storesPage';
import './containers/home.css';


class Customroutes extends React.Component{
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={MainLogin}/>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path="/stores" component={storePage}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Customroutes;