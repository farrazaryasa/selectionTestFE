import { Button, FileInput, Label, Modal, TextInput } from 'flowbite-react';
import { useRef, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { editProfile } from '../../api/users';
import toast, { Toaster } from 'react-hot-toast'
import { newToken } from '../../api/auth';
import { useNavigate } from 'react-router-dom';


export default function ProfileBio(props) {
    const getLoginDetails = JSON.parse(localStorage.getItem('loginDetails'))
    const [visible, setVisible] = useState(false)
    const _bio = useRef()
    const _username = useRef()
    const _fullName = useRef()
    const _image = useRef()
    const navigate = useNavigate()

    const submitEdit = async () => {
        try {
            const bio = _bio.current.value
            const username = _username.current.value
            const fullName = _fullName.current.value
            const image = _image.current.files[0]

            if (bio || username || fullName || image) {
                const result = await editProfile({
                    bio: bio,
                    username: username,
                    full_name: fullName,
                    image: image
                })

                if (result.data.success === true) {
                    toast.success('Profile edit success')
                    props.data.getUserProfile()
                    _bio.current.value = ''
                    _fullName.current.value = ''
                    _username.current.value = ''
                    setTimeout(() => {
                        setVisible(false)
                    }, 500)
                }
            } else {
                toast.error('Please fill one of the fields')
            }

        } catch (error) {
            console.log(error);
            toast.error('error')
        }
    }

    const newVerificationLink = async () => {
        try {
            const result = await newToken({ id: getLoginDetails.id })

            if (result.data.success) {
                toast.success('New verification link has been sent to your email', {
                    duration: 2000
                })
                localStorage.removeItem('loginDetails')
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <div className="flex-2 w-1/4 flex flex-col gap-4 p-4 border-r md:w-full sm:w-full">
                <Toaster />
                {/* user profile picture */}
                <div className="w-full flex items-center justify-center">
                    <img src={props?.data?.userData?.profile_picture ?
                        `http://localhost:4567/imageUsers/${props?.data?.userData?.profile_picture}` :
                        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                    } className='rounded-full' />
                </div>
                {/* user biodata */}
                <div className="flex flex-col items-center px-16">
                    <div className='flex flex-col gap-2 w-full'>
                        <div className="text-2xl font-bold">
                            {props?.data?.userData?.user?.full_name}
                        </div>
                        <div className="text-xl">
                            @{props?.data?.userData?.user?.username}
                        </div>
                        <div className='break-words'>
                            {props?.data?.userData?.bio}
                        </div>
                        {props?.data?.userData?.user?.is_active === true ?
                            <div className='flex items-center gap-9 pt-4 text-lg'>
                                <div className='flex items-center'><AiOutlineCheck />Verified</div>
                                <div onClick={() => setVisible(true)} className='flex items-center hover:cursor-pointer'><AiOutlineEdit />Edit Profile</div>
                            </div> :
                            <div className='flex justify-center'>
                                <Button onClick={newVerificationLink}>Send Verification Link</Button>
                            </div>

                        }
                    </div>
                </div>
                {/* user total posts and likes */}
                <div className='flex justify-evenly items-center mt-4 mx-9 py-4 text-lg border-t border-b'>
                    <div className='flex flex-col items-center font-bold'>
                        <div>{props.data.total_post}</div>
                        <div>Posts</div>
                    </div>
                </div>
            </div>
            <Modal show={visible} onClose={() => setVisible(false)}>
                <Modal.Header>Edit Profile</Modal.Header>
                <Modal.Body>
                    <div className='flex flex-col gap-4'>
                        <div>
                            <Label>Full Name</Label>
                            <TextInput ref={_fullName}></TextInput>
                        </div>
                        <div>
                            <Label>New Username</Label>
                            <TextInput addon='@' ref={_username}></TextInput>
                        </div>
                        <div>
                            <Label>Bio</Label>
                            <TextInput ref={_bio}></TextInput>
                        </div>
                        <div>
                            <Label>Profile Picture</Label>
                            <FileInput ref={_image}></FileInput>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={submitEdit}>Submit</Button>
                    <Button color={'failure'}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
