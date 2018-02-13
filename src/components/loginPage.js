import React from 'react';
import {loginApi, signupApi} from "../api";


class MainLogin extends React.Component {

    componentWillMount(){
        this.setState({
            login:true,
            forgotPassword:false,
            signup:false,
            back:false
        });
    }

    constructor(props){
        super(props);
        this.state = {
            login:true,
            forgotPassword:false,
            signup:false,
            back:false
        };
        this.handleForgot = this.handleForgot.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
    }

    handleForgot = event => {
        this.setState({
            login: !this.state.login,
            forgotPassword: !this.state.forgotPassword,
            back:!this.state.back
        });
    };

    handleSignup = event => {
        this.setState({
            login: !this.state.login,
            signup: !this.state.signup,
            back:!this.state.back
        });
    };

    render() {

        return (
            <div className="home">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <div className="login" id="id_login">
                                {this.state.login ? <Login handleforgot={this.handleForgot} handlesignup={this.handleSignup} /> :null}
                                {this.state.forgotPassword ? <Forgot handleforgot={this.handleForgot} /> :null}
                                {this.state.signup ? <Signup handlesignup={this.handleSignup} /> :null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {username:"",password:""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = event => {
        event.preventDefault();
        document.getElementById("signin-btn").setAttribute("disabled","disabled");
        var data = {username:this.state.username,password:this.state.password};
        var token = loginApi(data);
        token.then(function (response) {
            console.log(response);
            localStorage.setItem("token", response.data.token);
            window.location.href = "/dashboard";
        })
            .catch(function (error) {
                document.getElementById("id_error").style.display = "block";
                document.getElementById("signin-btn").removeAttribute("disabled");
            });
    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value,
        });
        document.getElementById("id_error").style.display = "none";
    };

    render(){
        return(
            <div>
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
                    <div className="form-group">
                        <div id="id_error">
                            *Invalid credentials
                        </div>
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary" id="signin-btn">
                            Sign in
                        </button>
                    </div>
                    <div className="form-group text-center">
                        <a onClick={this.props.handleforgot}>Forgot your password?</a><br/>
                        <span id="or">or</span><br/>
                        <a onClick={this.props.handlesignup}>Register with us</a>
                    </div>
                </form>
            </div>
        );
    }
}


class Forgot extends React.Component {

    render() {
        return (
            <div>
                <div><i className="fa fa-arrow-left" onClick={this.props.handleforgot}><span className="back"> Go back</span></i></div>
                <h3 className="text-center">Forgot your password</h3>
                <form className="forgot-form">
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-envelope fa" aria-hidden="true">
                                </i>
                            </span>
                            <input type="text" className="form-control" name="username" id="username" required
                                   placeholder="Enter your registered email" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

class Signup extends React.Component{

    constructor(props){
        super(props);
        this.state = {message:""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event => {
        document.getElementById("id_signup_error").style.display = "none";
    };

    handleSubmit = event => {

        var self = this;

        event.preventDefault();
        const formData = {};
        for (const field in this.refs){
            formData[field] = this.refs[field].value;
        }
        var response = signupApi(formData);

        response.then(function (data) {
            console.log(data);
            console.log(data.data.error);
           if (data.status === 201) {
               window.location.href = "/";
           }
           if (data.status === 200) {
               self.setState({message:data.data.error});
               document.getElementById("id_signup_error").innerText = "*"+self.state.message;
               document.getElementById("id_signup_error").style.display = "block";
           }
        });

    };

    render(){

        return(
           <div>
               <div><i className="fa fa-arrow-left" onClick={this.props.handlesignup}><span className="back"> Go back</span></i></div>
               <h3 className="text-center">Signup Form</h3>
               <form className="signup-form" onSubmit={this.handleSubmit}>
                   <div className="form-group">
                       <div className="form-group">
                           <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-envelope fa" aria-hidden="true">
                                </i>
                            </span>
                               <input ref="email" type="email" className="form-control" name="email" id="email" required placeholder="Enter your Email" onChange={this.handleChange} />
                           </div>
                       </div>
                       <div className="form-group">
                           <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-lock fa-lg" aria-hidden="true">
                                </i>
                            </span>
                               <input ref="password" type="password" className="form-control" name="password" id="password" required placeholder="Enter your Password" onChange={this.handleChange} />
                           </div>
                       </div>
                       <div className="form-group">
                           <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-lock fa-lg" aria-hidden="true">
                                </i>
                            </span>
                               <input ref="confirm_password" type="password" className="form-control" name="confirm_password" id="confirm_password" required placeholder="Confirm your Password" onChange={this.handleChange} />
                           </div>
                       </div>
                       <div className="form-group">
                           <div className="signup-error" id="id_signup_error">

                           </div>
                       </div>
                       <div className="form-group text-center">
                           <button type="submit" className="btn btn-primary">Submit</button>
                       </div>
                   </div>
               </form>
           </div>
        );
    }
}

export default MainLogin;