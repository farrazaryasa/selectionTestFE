import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function SuccessVerify() {
    const navigate = useNavigate()

    const changePage = () => {
        setTimeout(() => {
            navigate('/login')
        }, 5000)
    }

    useEffect(() => {
        changePage()
    }, [])

    return (
        <div className="flex justify-center h-screen w-screen bg-[url(https://i.pinimg.com/736x/50/96/f9/5096f99c9d85b81d48aa3fc920b0e603.jpg)]">
            <div className="w-1/3 h-full border bg-white flex flex-col items-center justify-center gap-4">
                <div className="text-6xl font-bold">Congratulations!!!</div>
                <div className="text-2xl">Your account has been verified</div>
                <div className="pt-9">You will be redirected to login page in 5 seconds</div>
                <div className="flex gap-1">
                    <div>if you are not redirect automatically, </div>
                    <Link to={'/login'}>
                        <div className="text-blue-800 underline hover:cursor-pointer">press here </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
