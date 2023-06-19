import axios from "axios";

export function userRegister(data) {
    return axios.post(
        process.env.REACT_APP_API + `/auth/register`,
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
        process.env.REACT_APP_API + `/auth/login`,
        {
            username: data.username,
            password: data.password
        }
    )
}

export function verifyUser(token) {
    return axios.patch(
        process.env.REACT_APP_API + `/auth/verification/${token}`
    )
}

export function userLogout(username) {
    return axios.post(
        process.env.REACT_APP_API + `/auth/logout`,
        {
            username: username
        }
    )
}

export function newToken(data) {
    return axios.patch(
        process.env.REACT_APP_API + `/auth/verification/new`,
        {
            id: data.id
        }
    )
}