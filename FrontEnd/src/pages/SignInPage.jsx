import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../../components/APIs/api'

export default function SignInPage() {
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: {errors} } = useForm()

    const onSubmit = async (data) => {
      try {
        await LoginUser(data.email, data.password)
        alert("Check in successfully")
        navigate("/dashboard") // redirect to dashboard upon successfull login
        // console.log("User data: ", data);       
      } catch (error) {
        // console.error("Login error: ", error);
        alert("Check in failed. Please check your credentials")        
      } finally {
        reset()
      }
    }

  return (
    <div className='max-w-xl mx-auto'>
        <Logo />
        <h2 className='text-3xl text-center ' >Check In</h2>

        <div className="px-14 py-5 ">
            <form className='flex flex-col gap-2'
                action="" method='post'onSubmit={handleSubmit(onSubmit)} >
                
                <input type="email" name='email' placeholder='Email' {...register("email", {required: "Email address is required"})} 
                    className='bg-white border border-gray-500 py-3 px-5 placeholder:text-xl rounded-md focus-within:outline-none ' />
                {errors.email && (
                    <span className='text-red-500' >{errors.email.message || "Email address is required"}</span>
                )}
                <input type="password" name='password' placeholder='Password' {...register("password", {required: "Password is required"})}
                    className='bg-white border border-gray-500 py-3 px-5 placeholder:text-xl rounded-md focus-within:outline-none ' />
                {errors.password && (
                    <span className='text-red-500' >{errors.password.message || "Password is required"}</span>
                )}
                <Link to="/reset-password" >
                    <span className="underline text-blue-600 " >Forgot password</span>
                </Link>
                
                <div className="flex justify-between mt-3">
                  <Button title="Continue" action="submit" bgColor="#7ed0ec" width="fit" />
                  <div className="flex gap-1 flex-col sm:flex-row text-[12px] sm:text-lg place-self-end ">
                    <p className='  ' >
                        Don't have an account? 
                    </p>
                    <p className='text-blue-600 ' >
                      <Link to="/signup" > Register </Link>
                    </p>                   
                  </div>                    
              </div>
            </form>
        </div>
    </div>
  )
}
