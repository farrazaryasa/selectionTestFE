import axios from 'axios'


export function getAllPosts(data) {
    const userLogin = localStorage.getItem("loginDetails") ? JSON.parse(localStorage?.getItem("loginDetails")) : {}
    return axios.get(
        process.env.REACT_APP_API + `/posts?page=${data.page}`,
        {
            headers: {
                Authorization: `Bearer ${userLogin?.token}`
            }
        }
    )
}

export function createNewPost(data) {
    const userLogin = localStorage.getItem("loginDetails") ? JSON.parse(localStorage?.getItem("loginDetails")) : {}
    return axios.post(
        process.env.REACT_APP_API + `/posts`,
        {
            caption: data.caption,
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

export function deletePost(data) {
    const userLogin = localStorage.getItem("loginDetails") ? JSON.parse(localStorage?.getItem("loginDetails")) : {}
    return axios.delete(
        process.env.REACT_APP_API + `/posts/${data.id}`,
        {
            headers: {
                Authorization: `Bearer ${userLogin?.token}`
            }
        }
    )
}

export function editPost(data) {
    const userLogin = localStorage.getItem("loginDetails") ? JSON.parse(localStorage?.getItem("loginDetails")) : {}
    return axios.patch(
        process.env.REACT_APP_API + `/posts/${data.id}`,
        {
            caption: data.caption
        },
        {
            headers: {
                Authorization: `Bearer ${userLogin?.token}`
            }
        }
    )
}

export function postDetails(data) {
    const userLogin = localStorage.getItem("loginDetails") ? JSON.parse(localStorage?.getItem("loginDetails")) : {}
    return axios.get(
        process.env.REACT_APP_API + `/posts/${data.id}`,
        {
            headers: {
                Authorization: `Bearer ${userLogin?.token}`
            }
        }
    )
}

export function getAllComments(data) {
    const userLogin = localStorage.getItem("loginDetails") ? JSON.parse(localStorage?.getItem("loginDetails")) : {}
    return axios.get(
        process.env.REACT_APP_API + `/posts/comments/${data.id}`,
        {
            headers: {
                Authorization: `Bearer ${userLogin?.token}`
            }
        }
    )
}

export function countLikes(data) {
    const userLogin = localStorage.getItem("loginDetails") ? JSON.parse(localStorage?.getItem("loginDetails")) : {}
    return axios.get(
        process.env.REACT_APP_API + `/posts/likes/${data.id}`,
        {
            headers: {
                Authorization: `Bearer ${userLogin?.token}`
            }
        }
    )
}