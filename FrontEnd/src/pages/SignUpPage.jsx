import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import { Link } from 'react-router-dom'
import { SignUpUser } from '../../components/APIs/api'

export default function SignUpPage() {
    const { register, handleSubmit, reset, formState: {errors} } = useForm()

    const onSubmit = async (data) => {
      try {
        await SignUpUser(data.name, data.email, data.password)
        alert("Registration successful. Please check in with your creditentials.")
        // console.log("User data: ", data);        
      } catch (error) {
        // console.error("Registration error: ", error);
        alert("Registration failed")               
      } finally {
        reset();
      }
    }

  return (
    <div className='max-w-xl mx-auto'>
        <Logo />
        <h2 className='text-3xl text-center ' >Register</h2>

        <div className="px-14 py-5 ">
            <form className='flex flex-col gap-2'
                action="" method='post'onSubmit={handleSubmit(onSubmit)} >
                <input type="text" name='name' placeholder='Name' {...register("name", {required: "Name is required"})}
                    className='bg-white border border-gray-500 py-3 px-5 placeholder:text-xl rounded-md focus-within:outline-none ' />
                {errors.name && (
                    <span className='text-red-500'>{errors.name.message || "Name is required"}</span>
                )}
                <input type="email" name='email' placeholder='Email' {...register("email", {required: "Email address is required"})}
                    className='bg-white border border-gray-500 py-3 px-5 placeholder:text-xl rounded-md focus-within:outline-none ' />
                {errors.email && (
                    <span className='text-red-500' >{errors.email.message || "Email address is required" }</span>
                )}
                <input type="password" name='password' placeholder='Password' {...register("password", {required: "Password is required"})}
                    className='bg-white border border-gray-500 py-3 px-5 placeholder:text-xl rounded-md focus-within:outline-none ' />
                {errors.password && (
                    <span className='text-red-500' >{errors.password.message || "Password is required" }</span>
                )}
                <div className="flex justify-between mt-3">
                    <Button title="Continue" action="submit" bgColor="#7ed0ec" width="fit" />
                    <div className="flex gap-1 flex-col sm:flex-row text-[12px] sm:text-lg place-self-end ">
                    <p className='  ' >
                        Already have an account?
                    </p>
                    <p className='text-blue-600 ' >
                        <Link to="/" > Check In </Link>
                    </p>                   
                    </div>                    
                </div>
            </form>
        </div>
    </div>
  )
}
