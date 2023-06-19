import { useEffect, useState } from "react";
import ProfileBio from "../components/profile/ProfileBio";
import PostsCard from "../components/timeline/PostsCard";
import { getUserDetails, getUserPosts } from "../api/users";


export default function ProfileUser() {
    const [userData, setUserData] = useState([])
    const [userPost, setUserPost] = useState([])

    const getUserProfile = async () => {
        try {
            const result = await getUserDetails()
            setUserData(result.data.data);
        } catch (error) {
            alert(error.message)
        }
    }

    const getCurrentUserPosts = async () => {
        try {
            const result = await getUserPosts()
            setUserPost(result?.data?.data)
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        getUserProfile()
        getCurrentUserPosts()
    }, [])

    return (
        <div className="flex sm:flex sm:flex-col">
            <ProfileBio data={{ userData, getUserProfile, total_post: userPost.count }} />
            <div className="flex-1 w-full flex flex-wrap justify-around">
                {userPost?.rows?.map((value, index) => {
                    return (
                        <PostsCard key={index} data={{ value }} />
                    )
                })}
            </div>
        </div>
    )
}
