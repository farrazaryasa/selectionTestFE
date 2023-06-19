import { Button, Label, Modal, Textarea } from 'flowbite-react';
import { useRef, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { editPost } from '../../api/post';
import toast, { Toaster } from 'react-hot-toast';


export default function CardDetails(props) {
    const loginDetails = JSON.parse(localStorage.getItem('loginDetails'))
    const [editCaption, setEditCaption] = useState(false)
    const _caption = useRef()

    const submitEditCaption = async () => {
        try {
            const caption = _caption.current.value
            const result = await editPost(
                {
                    id: props?.data?.postData?.id,
                    caption: caption
                }
            )

            if (result.data.success) {
                toast.success('Caption has been change')
                props.data.getDetails()
                _caption.current.value = ''
                setEditCaption(false)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <>
            <Toaster />
            <div className="flex-1 w-1/3 flex flex-col p-9 gap-4 sm:w-full">
                <div className="flex-1 w-full h-1/2 flex justify-center">
                    <img src={`http://localhost:4567/imagePosts/${props?.data?.postData?.post_image}`} className="object-cover rounded-lg" />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <div className="text-2xl font-bold break-words">
                        @{props?.data?.postData?.user?.username}
                    </div>
                    <div>
                        {props?.data?.postData?.createdAt}
                    </div>
                    <div className='flex gap-4 items-center'>
                        {
                            loginDetails.email === props?.data?.postData?.user?.email ?
                                <div onClick={() => setEditCaption(true)} className='hover:cursor-pointer'>
                                    <AiOutlineEdit size={20} />
                                </div> :
                                ''
                        }
                        <div className='break-words'>
                            {props?.data?.postData?.caption}
                        </div>
                    </div>
                    <div>
                        {props?.data?.likeNum} Likes
                    </div>
                </div>
            </div>
            <Modal show={editCaption} onClose={() => setEditCaption(false)}>
                <Modal.Header>
                    Edit Caption
                </Modal.Header>
                <Modal.Body>
                    <Label>New Caption</Label>
                    <Textarea ref={_caption}></Textarea>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={submitEditCaption}>Submit</Button>
                    <Button color={'failure'}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
