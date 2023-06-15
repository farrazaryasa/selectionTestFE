import { useEffect, useRef, useState } from "react";
import RegisterForm from "../components/register/RegisterForm";
import { Button, Label, TextInput } from "flowbite-react";
import toast, { Toaster } from 'react-hot-toast';
import { userLogin } from "../api/users";
import { useNavigate } from "react-router-dom";



export default function Login() {
    const [registerModal, setRegisterModal] = useState(false)
    const _username = useRef()
    const _password = useRef()
    const navigate = useNavigate()

    const showRegisterModal = (check) => {
        setRegisterModal(check)
    }

    const checkLogin = async () => {
        try {
            const username = _username.current.value
            const password = _password.current.value

            if (!username || !password) {
                // toast.error('Please fill all the fields')
                alert('please fill all the fields')
            } else {
                const login = await userLogin({ username, password })

                if (login.data.success === true) {
                    // toast.success('Login Success')
                    alert('Login Success')
                    setTimeout(() => {
                        navigate('/')
                    }, 1000)
                } else {
                    alert('invalid credentials')
                }
            }

        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <>
            <div className="flex">
                <Toaster />
                <div className="flex-1 h-screen bg-[url(https://i.pinimg.com/736x/50/96/f9/5096f99c9d85b81d48aa3fc920b0e603.jpg)]"></div>
                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="w-1/2 flex flex-col gap-5">
                        <div className="text-2xl font-bold">Login to your account</div>
                        <div>
                            <Label>Username or Email</Label>
                            <TextInput ref={_username} className="w-full"></TextInput>
                        </div>
                        <div>
                            <Label>Password</Label>
                            <TextInput ref={_password} type="password" className="w-full"></TextInput>
                        </div>
                        <div>
                            <Button onClick={checkLogin} className="px-9">Login</Button>
                        </div>
                        <div className="underline hover:cursor-pointer">Forgot Password?</div>
                        <div className="pt-9">Don't have an account?</div>
                        <div>
                            <Button onClick={() => setRegisterModal(true)} color={'light'}>Register</Button>
                        </div>
                    </div>
                </div>
            </div>

            <RegisterForm data={{ showRegisterModal, registerModal }} />
        </>
    )
}
