import { Button, FileInput, Textarea } from "flowbite-react";
import { useRef } from "react";
import toast, { Toaster } from 'react-hot-toast'
import { createNewPost } from "../../api/post";

export default function PostingForm(props) {
    const getLoginDetails = JSON.parse(localStorage.getItem('loginDetails'))
    const _caption = useRef()
    const _file = useRef()

    const handleFileChange = () => {
        const file = _file.current.files[0]
    }

    const newPost = async () => {
        const caption = _caption.current.value
        const file = _file.current.files[0]

        if (!file) {
            toast.error('please upload image')
        } else {
            const result = await createNewPost({
                caption: caption,
                image: file
            })

            if (result.data.success === true) {
                toast.success('New Post created', {
                    duration: 2000
                })
                _caption.current.value = ''
            } else {
                toast.error('Failed to create new post')
            }

            props.getPosts()
        }
    }

    return (
        <>
            <div>
                <Toaster />
                <Textarea placeholder="Your Caption Here" ref={_caption}></Textarea>
            </div>
            <div className="flex gap-4 items-center sm:flex sm:flex-col">
                <div className="flex-1">
                    <FileInput onChange={handleFileChange} ref={_file}></FileInput>
                </div>
                <div className="flex-2">
                    {
                        getLoginDetails?.is_active === true ?
                            <Button onClick={newPost} className="px-9 py-4">POST</Button> :
                            <Button disabled className="px-9 py-4">POST</Button>
                    }
                </div>
            </div>
        </>
    )
}
