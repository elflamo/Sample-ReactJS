import React from 'react';
import {loginApi, signupApi, checkOtpApi, resetPasswordApi, sendOtpApi} from "../api";
import {Redirect} from 'react-router';


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
            forcelogin:false,
            signup:false,
            back:false,
            sendOtp:false,
            verifyOtp:false,
            resetPassword:false,
            confirmReset:false,
            userObject:""
        };
        this.handleSendOtp = this.handleSendOtp.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.nextVerifyOtp = this.nextVerifyOtp.bind(this);
        this.nextReset = this.nextReset.bind(this);
        this.nextConfirm = this.nextConfirm.bind(this);
        this.forceLogin = this.forceLogin.bind(this);
    }

    handleSignup = event => {
        this.setState({
            login: !this.state.login,
            signup: !this.state.signup,
            back:!this.state.back
        });
    };

    handleSendOtp = event => {
        this.setState({
            login: !this.state.login,
            sendOtp: !this.state.sendOtp,
            back:!this.state.back
        });
    };

    nextVerifyOtp = event => {
        this.setState({
            sendOtp:false,
            verifyOtp:true
        });
    };

    nextReset = event => {
        this.setState({
            verifyOtp:false,
            resetPassword:true
        });
    };

    forceLogin = event => {
        this.setState({
            forcelogin:true
        });
    };

    nextConfirm = event => {
        this.setState({
            resetPassword:false,
            confirmReset:true
        });
    };

    render() {

        return (
            <div className="home">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <div className="login" id="id_login">
                                {this.state.login ? <Login handleforgot={this.handleSendOtp} pushLogin={this.forceLogin} handlesignup={this.handleSignup} /> :null}
                                {this.state.signup ? <Signup handlesignup={this.handleSignup} /> :null}
                                {this.state.sendOtp ? <SendForgotOtp handleforgot={this.handleSendOtp} next={this.nextVerifyOtp} setUser={this} /> :null}
                                {this.state.verifyOtp ? <CheckForgotOtp next={this.nextReset} setUser={this} /> :null}
                                {this.state.resetPassword ? <ResetPassword next={this.nextConfirm} setUser={this} /> :null}
                                {this.state.confirmReset ? <ConfirmReset/> :null}
                                {this.state.forcelogin ? <Redirect to="/dashboard" />: null}
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
        var self = this.props.pushLogin;
        token.then(function (response) {
            console.log(response);
            localStorage.setItem("token", response.data.token);
            self();
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


class SendForgotOtp extends React.Component{

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit = event => {
        event.preventDefault();

        var self = this.props;
        const formData = {};
        formData['email'] = document.getElementById("email").value;

        var hit = sendOtpApi(formData);
        hit.then(function (response) {
            if (response.status === 203) {
                document.getElementById("error").innerText = response.data.error;
            }
            if (response.status === 200) {
                self.setUser.setState({
                    userObject: response.data.user
                });
                self.next();
            }
        });
    };

    render(){
        return (
            <div>
                <div><i className="fa fa-arrow-left" onClick={this.props.handleforgot}><span className="back"> Go back</span></i></div>
                <h3 className="text-center">Forgot your password</h3>
                <form className="forgot-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <div className="input-group">
                        <span className="input-group-addon">
                            <i className="fa fa-envelope fa" aria-hidden="true">
                            </i>
                        </span>
                            <input type="text" className="form-control" name="email" id="email" required
                                   placeholder="Enter your registered email" />
                        </div>
                    </div>
                    <div className="error">

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


class CheckForgotOtp extends React.Component{

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = event => {
        event.preventDefault();

        var self = this.props;
        var user = this.props.setUser.state.userObject;
        const formData = {
            otp:document.getElementById("otp").value,
            email:user
        };

        var hit = checkOtpApi(formData);
        hit.then(function (response) {
            if (response.status === 203) {
                document.getElementById("error").innerText = response.data.error;
            }
            if (response.status === 200) {
                self.next();
            }
        });
    };

    render() {

        return (
            <div>
                <h3 className="text-center">Enter Otp sent on your email</h3>
                <form className="checkOtp-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input className="form-control" name="otp" id="otp" type="number" placeholder="Enter Otp" />
                    </div>
                    <div className="form-group">
                        <div className="error">

                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}


class ResetPassword extends React.Component{

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = event => {
        event.preventDefault();
        var self = this.props;
        const formData = {};
        formData['email'] = this.props.setUser.state.userObject;
        formData['password'] = document.getElementById("password").value;
        formData['confirm_password'] = document.getElementById("confirm_password").value;
        resetPasswordApi(formData).then(function (response) {

            if (response.status === 203) {
                document.getElementById("error").innerText = response.data.error;
            }
            if (response.status === 200) {
                self.next();
            }
        });
    };

    render() {

        return (

            <div>
                <h3 className="text-center">Reset your password</h3>
                <form className="resetPassword-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input className="form-control" name="password" type="password" id="password" placeholder="Enter new password" />
                    </div>
                    <div className="form-group">
                        <input className="form-control" name="confirm_password" type="password" id="confirm_password" placeholder="Confirm new password" />
                    </div>
                    <div className="error">

                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}


class ConfirmReset extends React.Component{

    render() {

        return(
            <div>
                <h3 className="text-center">Password reset complete</h3>
                <div>
                    Kindly <a href="/">login</a>
                </div>
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