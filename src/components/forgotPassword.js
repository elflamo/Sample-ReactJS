import React from 'react';
import {checkOtpApi, sendOtpApi, resetPasswordApi} from '../api';


class SendForgotOtp extends React.Component{

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = event => {
        const formData = {};
        formData['email'] = document.getElementById("email").value;
        sendOtpApi(formData).then(function (response) {
            if (response.status === 203) {
                document.getElementById("error").innerText = response.data.error;
            }
            if (response.status === 200) {
                //TODO: Set state
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

        const formData = {};
        formData['otp'] = document.getElementById("otp");

        checkOtpApi(formData).then(function (response) {
            if (response.status === 203) {
                document.getElementById("error").innerText = response.data.error;
            }
            if (response.status === 200) {
                //TODO: Set state
            }
        });
    };

    render() {

        return (
            <div>
                <h3 className="text-center">Enter Otp sent on your email</h3>
                <form className="checkOtp-form" onSubmit={}>
                    <div className="form-group">
                        <input className="form-control" name="otp" id="otp" type="text" placeholder="Enter Otp" />
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
        const formData = {};
        formData['password'] = document.getElementById("password").value;
        formData['confirm_password'] = document.getElementById("confirm_password").value;
        resetPasswordApi(formData).then(function (response) {

            if (response.status === 203) {
                document.getElementById("error").innerText = response.data.error;
            }
            if (response.status === 200) {
               //TODO: Set state
            }
        });
    };

    render() {
        return(
            <div>
                <h3 className="text-center">Reset you password</h3>
                <form className="resetPassword-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input className="form-control" name="password" type="password" id="password" />
                    </div>
                    <div className="form-group">
                        <input className="form-control" name="confirm_password" type="password" id="confirm_password" />
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
                    Kindly<a href="/">login</a>
                </div>
            </div>
        );
    }
}