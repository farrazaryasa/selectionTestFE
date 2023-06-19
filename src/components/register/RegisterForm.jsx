import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { AiOutlineEye } from 'react-icons/ai';
import { BsFillEyeFill } from 'react-icons/bs';
import { userRegister } from "../../api/auth";



export default function RegisterForm(props) {
    const [showPassword, setShowPassword] = useState('password')
    const [showConfirmationPassword, setShowConfirmationPassword] = useState('password')
    const _fullName = useRef()
    const _username = useRef()
    const _email = useRef()
    const _password = useRef()
    const _confirmationPassword = useRef()

    const passwordText = () => {
        if (showPassword === 'password') {
            setShowPassword('text')
        } else {
            setShowPassword('password')
        }
    }

    const confirmationPasswordText = () => {
        if (showConfirmationPassword === 'password') {
            setShowConfirmationPassword('text')
        } else {
            setShowConfirmationPassword('password')
        }
    }

    const newRegister = async () => {
        try {
            const name = _fullName.current.value
            const username = _username.current.value
            const email = _email.current.value
            const password = _password.current.value
            const passwordConfirmation = _confirmationPassword.current.value

            if (!username || !email || !password || !passwordConfirmation) {
                toast.error('Please fill all the fields')
            } else if (password !== passwordConfirmation) {
                toast.error('Password different')
            } else if (password.length < 8) {
                toast.error('Password must be 8 characters or more')
            } else {
                const register = await userRegister({
                    name: name,
                    username: username,
                    email: email,
                    password: password,
                    passwordConfirmation: passwordConfirmation
                })

                if (register.data.success === true) {
                    toast.success('Registration Success')
                    _fullName.current.value = ''
                    _email.current.value = ''
                    _username.current.value = ''
                    _password.current.value = ''
                    _confirmationPassword.current.value = ''
                    setTimeout(() => {
                        toast.success('Verification link has been sent to your email')
                    }, 500)
                    setTimeout(() => {
                        props.data.showRegisterModal(false)
                    }, 2000)
                }
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <Modal show={props.data.registerModal} onClose={() => props.data.showRegisterModal(false)}>
            <Toaster />
            <Modal.Header>Register New Account</Modal.Header>
            <Modal.Body>
                <div className="w-full flex flex-col gap-4">
                    <div className="w-full">
                        <Label>Full Name</Label>
                        <TextInput ref={_fullName}></TextInput>
                    </div>
                    <div className="w-full">
                        <Label>Username</Label>
                        <TextInput addon='@' required ref={_username}></TextInput>
                    </div>
                    <div className="w-full">
                        <Label>Email</Label>
                        <TextInput type="email" required ref={_email}></TextInput>
                    </div>
                    <div className="w-full">
                        <Label>Password</Label>
                        <div className="flex w-full items-center gap-4">
                            <div className="flex-1"><TextInput type={showPassword} required ref={_password}></TextInput></div>
                            <div onClick={passwordText} className="flex-2 hover:cursor-pointer">{showPassword === 'password' ? <BsFillEyeFill size={25} /> : <AiOutlineEye size={25} />}</div>
                        </div>
                    </div>
                    <div className="w-full">
                        <Label>Confirmation Password</Label>
                        <div className="flex w-full items-center gap-4">
                            <div className="flex-1"><TextInput type={showConfirmationPassword} required ref={_confirmationPassword}></TextInput></div>
                            <div onClick={confirmationPasswordText} className="flex-2 hover:cursor-pointer">{showConfirmationPassword === 'password' ? <BsFillEyeFill size={25} /> : <AiOutlineEye size={25} />}</div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex gap-4 pt-6">
                    <Button onClick={newRegister} className="px-9">Register</Button>
                    <Button onClick={() => props.data.showRegisterModal(false)} className="px-9" color={'failure'}>Cancel</Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}
