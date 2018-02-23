import axios from "axios";

export function loginApi (data) {
    return axios.post("http://localhost:8000/token/obtain", data)
}

export function signupApi(data) {
    return axios.post("http://localhost:8000/signup", data)
}

export function sendOtpApi(data) {
    return axios.post("http://localhost:8000/send/reset/otp", data)
}

export function checkOtpApi(data) {
    return axios.post("http://localhost:8000/check/otp", data)
}

export function resetPasswordApi(data) {
    return axios.post("http://localhost:8000/reset/password", data)
}

export function dashboardBaseApi(custheaders) {
    return axios.get("http://localhost:8000/dashboard/basics", {headers:custheaders})
}

export function storeListApi(customheaders) {
    return axios.get("http://localhost:8000/store/", {headers:customheaders})
}
