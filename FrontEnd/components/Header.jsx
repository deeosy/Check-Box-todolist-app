import React from 'react'
import Logo from './Logo'
import Button from '../components/Button'
import { LogOutUser } from './APIs/api'
import { useNavigate } from 'react-router-dom'


export default function Header() {
    const navigate = useNavigate()  // will use hook to redirect after logout

    const handleLogOut = async () => {
        try {
            await LogOutUser();
            alert("Log out successfully")
            navigate('/')
        } catch (error) {
            // console.error("Log out error: ", error);            
            alert("Log out failed. Please try again.")
        }
    }

  return (
    <div className="flex items-center justify-between bg-[#3175c2] pr-2 rounded-b-xl relative z-10 ">
        <div className="flex items-center">
            <Logo />
        </div>
        <Button title="Exit" action="submit" bgColor="#7ed0ec" textColor="#20538d" click={handleLogOut} />
    </div>
  )
}
