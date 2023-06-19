import { useParams } from 'react-router-dom';
import CardDetails from '../components/postDetails/CardDetails';
import CommentBox from '../components/postDetails/CommentBox';
import { countLikes, getAllComments, postDetails } from '../api/post';
import { useEffect, useRef, useState } from 'react';
import { Button, Label, Textarea } from 'flowbite-react';
import toast, { Toaster } from 'react-hot-toast'
import { commentPost } from '../api/users';

export default function PostDetails() {
    const id = useParams()
    const [postData, setPostData] = useState([])
    const [commentData, setCommentData] = useState([])
    const [likeNum, setLikeNum] = useState(0)
    const _comment = useRef()
    const userLogin = JSON.parse(localStorage.getItem('loginDetails'))

    const getDetails = async () => {
        try {
            const result = await postDetails({ id: id.id })
            if (result.data.success) {
                setPostData(result.data.data)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const submitComment = async () => {
        try {
            const comment = _comment.current.value

            if (!comment) {
                toast.error('Please fill the comment box first')
            } else {
                const result = await commentPost({ id: id.id, comment: comment })

                if (result.data.success) {
                    toast.success('New comment posted')
                    _comment.current.value = ''
                    getComments()
                }
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const getComments = async () => {
        try {
            const result = await getAllComments({ id: id.id })

            if (result.data.success) {
                setCommentData(result.data)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const counterLikes = async () => {
        try {
            const result = await countLikes({ id: id.id })
            setLikeNum(result?.data?.data?.count)
        } catch (error) {

        }
    }

    useEffect(() => {
        getDetails()
        getComments()
        counterLikes()
    }, [])

    return (
        <div className="flex justify-evenly sm:flex sm:flex-col ">
            <Toaster />
            <CardDetails data={{ postData, likeNum, getDetails }} />
            <div className='flex-1 w-full border-l'>
                <div className='m-9 flex flex-col gap-4'>
                    <div className='text-2xl font-bold'>
                        Post a comment
                    </div>
                    <div>
                        <Label>Your Comment</Label>
                        <Textarea ref={_comment}></Textarea>
                    </div>
                    {
                        userLogin.is_active === true ?
                            <Button onClick={submitComment}>Submit</Button> :
                            <Button disabled>Submit</Button>
                    }
                </div>
                <div className='m-9 text-2xl font-bold'>
                    Comments (most recent)
                </div>
                {commentData?.data?.map((value, index) => {
                    return (
                        <CommentBox key={index} data={{ value }} />
                    )
                })}
            </div>
        </div>
    )
}
