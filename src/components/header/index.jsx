import React from 'react'
import {  useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth'
import  ThemeSwitcher  from '../../components/ThemeSwitcher';


const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn,logout} = useAuth()
    return (
        <nav className='flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200'>
            {
                userLoggedIn
                    ?
                    <>
                        <ThemeSwitcher></ThemeSwitcher>

                        <button onClick={() => { logout().then(() => { navigate('/login') }) }} className='text-sm text-blue-600 underline'>Logout</button>
                    </>
                    :
                    <>
                       
                    </>
            }

        </nav>
    )
}

export default Header