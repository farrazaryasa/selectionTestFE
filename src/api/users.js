import axios from "axios";

export function getUserDetails() {
    const userLogin = localStorage.getItem("loginDetails") ? JSON.parse(localStorage?.getItem("loginDetails")) : {}
    return axios.get(
        process.env.REACT_APP_API + `/users`,
        {
            headers: {
                Authorization: `Bearer ${userLogin?.token}`
            }
        }
    )
}

export function getUserPosts() {
    const userLogin = localStorage.getItem("loginDetails") ? JSON.parse(localStorage?.getItem("loginDetails")) : {}
    return axios.get(
        process.env.REACT_APP_API + '/users/posts',
        {
            headers: {
                Authorization: `Bearer ${userLogin?.token}`
            }
        }
    )
}

export function editProfile(data) {
    const userLogin = localStorage.getItem("loginDetails") ? JSON.parse(localStorage?.getItem("loginDetails")) : {}
    return axios.patch(
        process.env.REACT_APP_API + `/users`,
        {
            bio: data.bio,
            full_name: data.full_name,
            username: data.username,
            image: data.image
        },
        {
            headers: {
                Authorization: `Bearer ${userLogin?.token}`,
                "Content-Type": "multipart/form-data"
            }
        }
    )
}

export function commentPost(data) {
    const userLogin = localStorage.getItem("loginDetails") ? JSON.parse(localStorage?.getItem("loginDetails")) : {}
    return axios.post(
        process.env.REACT_APP_API + `/users/comments`,
        {
            post_id: data.id,
            comment: data.comment
        },
        {
            headers: {
                Authorization: `Bearer ${userLogin?.token}`
            }
        }
    )
}

export function likeOrUnlike(data) {
    const userLogin = localStorage.getItem("loginDetails") ? JSON.parse(localStorage?.getItem("loginDetails")) : {}
    return axios.post(
        process.env.REACT_APP_API + `/users/likes`,
        {
            post_id: data.id
        },
        {
            headers: {
                Authorization: `Bearer ${userLogin?.token}`
            }
        }
    )
}