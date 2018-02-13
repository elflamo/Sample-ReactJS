import axios from "axios";

var custheaders = {Authorization: "bearer " + localStorage.getItem("token")};

export function loginApi (data) {
    return axios.post("http://localhost:8000/token/obtain", data)
}

export function signupApi(data) {
    return axios.post("http://localhost:8000/signup", data)
}
