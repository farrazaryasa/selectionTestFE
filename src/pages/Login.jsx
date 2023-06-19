import { useEffect, useRef, useState } from "react";
import RegisterForm from "../components/register/RegisterForm";
import { Button, Label, TextInput } from "flowbite-react";
import { userLogin } from "../api/auth";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast'


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
                alert('please fill all the fields')
            } else {
                const login = await userLogin({ username, password })

                if (login.data.success === true) {
                    const payload = {
                        id: login.data.data.id,
                        email: login.data.data.email,
                        username: login.data.data.username,
                        is_active: login.data.data.is_active,
                        token: login.data.data.token
                    }
                    localStorage.setItem('loginDetails', JSON.stringify(payload))
                    alert('Login Success')
                    setTimeout(() => {
                        navigate('/')
                    }, 1000)
                } else {
                    alert('invalid credentials')
                }
            }

        } catch (error) {
            alert('user not found, please try again')
        }
    }

    return (
        <>
            <div className="flex">
                <div className="flex-1 h-screen bg-[url(https://i.pinimg.com/736x/50/96/f9/5096f99c9d85b81d48aa3fc920b0e603.jpg)] sm:hidden"></div>
                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="w-1/2 flex flex-col gap-5 sm:justify-center sm:h-screen">
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
