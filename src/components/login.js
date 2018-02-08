import React from 'react';
import axios from "axios";

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {username:"",password:""};
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        var data = {username:this.state.username,password:this.state.password};
        var token = axios.post("http://localhost:8000/token/obtain", data);
        token.then(function (response) {
            console.log(response);
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
            }
            if (response.status === 400){
                alert("lol");
            }
        });
    };

    render() {
        return (
            <div className="home">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <div className="login">
                                <h3 className="text-center">
                                    Welcome to StoreFront <i className="fa fa-shopping-cart">
                                </i>
                                </h3>
                                <form className="login-form" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="fa fa-envelope fa" aria-hidden="true">
                                                </i>
                                            </span>
                                            <input type="text" className="form-control" name="username" id="username" required placeholder="Enter your Email" value={this.state.username} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="fa fa-lock fa-lg" aria-hidden="true">
                                                </i>
                                            </span>
                                            <input type="password" className="form-control" name="password" id="password" required placeholder="Enter your Password" value={this.state.password} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-group text-center">
                                        <button type="submit" className="btn btn-primary">
                                            Sign in
                                        </button>
                                    </div>
                                    <div className="form-group">
                                        <a>Forgot your password?</a><span> | </span><a>New User?</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;