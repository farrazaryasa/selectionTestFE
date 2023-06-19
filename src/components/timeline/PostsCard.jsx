import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { countLikes, deletePost } from '../../api/post';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Button, Modal, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { likeOrUnlike } from '../../api/users';

export default function PostsCard(props) {
    const getLoginDetails = JSON.parse(localStorage.getItem('loginDetails'))
    const [totalLikes, setTotalLikes] = useState(0)

    const postDelete = async () => {
        try {
            const confirmation = window.confirm('Confirm delete this post?')
            const userLogin = JSON.parse(localStorage.getItem('loginDetails'))
            console.log(userLogin.username);
            if (confirmation === true && userLogin.email === props?.data?.value?.user?.email) {
                const result = await deletePost({ id: props?.data?.value?.id })

                if (result.data.success) {
                    toast.success('Delete post success')
                    props.data.getPosts()
                } else {
                    toast.error('Delete post failed')
                }
            }
        } catch (error) {
            console.log(error);
            toast.error('Oops something is wrong, try again later')
        }
    }

    const userLike = async () => {
        try {
            const result = await likeOrUnlike({ id: props?.data?.value?.id })

            if (result.data.success) {
                likeCounter()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const likeCounter = async () => {
        try {
            const total = await countLikes({ id: props?.data?.value?.id })

            if (total.data.success) {
                setTotalLikes(total?.data?.data?.count)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        likeCounter()
    }, [])

    return (
        <div className='border relative mx-9 w-[500px] p-9 flex flex-col gap-5 mb-9 rounded-lg bg-gradient-to-b from-blue-200 to-teal-400'>
            <Toaster />
            <Link to={`/post/${props.data.value.id}`}>
                <div className=' object-fill w-full'>
                    {props?.data?.value?.post_image ?
                        <img src={
                            `http://localhost:4567/imagePosts/${props?.data?.value?.post_image}`}
                            className='object-fit rounded-lg drop-shadow-lg w-full h-[500px]' /> :
                        ''
                    }
                </div>
            </Link>
            <div className='flex gap-9 items-center'>
                {/* Likes */}
                <div className='flex'>
                    <div><AiOutlineHeart onClick={userLike} size={25} /></div>
                    <div>{totalLikes}</div>
                </div>
                {/* Comments */}
                <Link to={`/post/${props.data.value.id}`}>
                    <div><FaRegComment size={20} /></div>
                </Link>
            </div>
            <div className='flex flex-col gap-2'>
                {/* username */}
                <div className='text-lg font-bold'>
                    @{props?.data?.value?.user?.username}
                </div>
                {/* Date */}
                <div>
                    {props?.data?.value?.createdAt}
                </div>
                {/* caption */}
                <div className='break-words'>
                    {props?.data?.value?.caption}
                </div>
            </div>
            {
                props?.data?.value?.user?.email === getLoginDetails.email ?
                    <div className='absolute right-5 bottom-5'>
                        <div className='flex gap-9'>
                            <div onClick={postDelete} className='hover:text-white hover:cursor-pointer'><BsFillTrashFill size={20} /></div>
                        </div>
                    </div>
                    :
                    ''
            }
        </div>
    )
}
