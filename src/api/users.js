import axios from "axios";

export function userRegister(data) {
    return axios.post(
        process.env.REACT_APP_API + `/users/register`,
        {
            name: data.name,
            email: data.email,
            username: data.username,
            password: data.password,
            confirmationPassword: data.passwordConfirmation
        }
    )
}

export function userLogin(data) {
    return axios.post(
        process.env.REACT_APP_API + `/users/login`,
        {
            username: data.username,
            password: data.password
        }
    )
}

export function verifyUser(token) {
    return axios.patch(
        process.env.REACT_APP_API + `/users/verify/${token}`
    )
}