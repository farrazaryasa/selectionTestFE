import { CgProfile } from 'react-icons/cg'
import { MdHomeFilled } from 'react-icons/md'
import { FiLogIn } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { userLogout } from '../../api/auth'
import toast, { Toaster } from 'react-hot-toast'


export default function Navbar() {
    const [loginStatus, setLoginStatus] = useState(false)
    const navigate = useNavigate()

    const checkLoginStatus = () => {
        const getCheckStorage = localStorage.getItem('loginDetails')
        if (getCheckStorage) {
            setLoginStatus(true)
        }
    }

    const logout = async () => {
        try {
            const loginData = JSON.parse(localStorage.getItem('loginDetails'))
            const signOut = await userLogout(loginData.username)
            console.log('signout => ', signOut);
            if (signOut.data.success === true) {
                localStorage.removeItem('loginDetails')
                toast.success('Logout success')
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkLoginStatus()
    }, [])

    return (
        <div className='flex justify-between sm:justify-evenly py-7 px-12 border-b bg-gradient-to-b from-amber-100 to-blue-200'>
            <Link to={'/'}>
                <div className='flex-2 flex flex-col items-center hover:text-white hover:cursor-pointer'>
                    <div><MdHomeFilled size={25} /></div>
                    <div>Home</div>
                </div>
            </Link>
            <div className='flex-1 flex justify-center items-center text-2xl font-bold sm:hidden'>
                THE SOCIAL MEDIA
            </div>
            <div className='flex gap-12 flex-2 items-center'>
                <Link to={'/profile'}>
                    <div className='flex flex-col items-center hover:text-white hover:cursor-pointer'>
                        <div>
                            <CgProfile size={25} />
                        </div>
                        <div>
                            Profile
                        </div>
                    </div>
                </Link>
                {loginStatus ?
                    <div onClick={logout} className='flex flex-col items-center hover:text-white hover:cursor-pointer'>
                        <div><FiLogIn size={25} /></div>
                        <div>Logout</div>
                    </div>
                    :
                    <Link to={'/login'}>
                        <div className='flex flex-col items-center hover:text-white hover:cursor-pointer'>
                            <div><FiLogIn size={25} /></div>
                            <div>Login</div>
                        </div>
                    </Link>
                }
            </div>
        </div>
    )
}
