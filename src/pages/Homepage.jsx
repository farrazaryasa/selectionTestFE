import PostsCard from "../components/timeline/PostsCard";
import toast, { Toaster } from 'react-hot-toast'
import { useEffect, useRef, useState } from "react";
import { getAllPosts } from "../api/post";
import PostingForm from "../components/timeline/PostingForm";
import { Button } from "flowbite-react";



export default function Homepage() {
    const listInnerRef = useRef()
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)

    const getPosts = async () => {
        try {
            const result = await getAllPosts({ page: page })
            setData(result?.data?.data?.allPost)
            setTotalPage(result?.data?.data?.total_page)
        } catch (error) {
            alert(error.message)
        }
    }

    const pagination = () => {
        setPage(page + 1)
        getPosts()
    }

    useEffect(() => {
        getPosts()
    }, [])
    return (
        <div className="flex flex-col gap-9">
            <div className="flex justify-center">
                <div className="w-1/2">
                    <div className="flex flex-col gap-4">
                        <div className="text-2xl font-bold">TELL YOUR STORY!</div>
                        <PostingForm getPosts={getPosts} />
                    </div>
                </div>
            </div>
            <div className="flex justify-center underline text-2xl font-bold">RECENT UPDATES</div>
            <div className="flex flex-wrap justify-around ">
                {
                    data?.rows?.map((value, index) => {
                        return (
                            <PostsCard key={index} data={{ value, getPosts }} />
                        )
                    })
                }
            </div>
            <div className="flex justify-center mb-9">
                {
                    page === totalPage + 1 ?
                        <Button disabled className="px-9"> No more posts available</Button> :
                        <Button onClick={pagination} className="px-9"> LOAD MORE </Button>
                }
            </div>
        </div>
    )
}
