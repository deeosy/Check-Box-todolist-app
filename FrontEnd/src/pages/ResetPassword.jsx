import React from 'react'
import Logo from '../../components/Logo'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import { RequestPasswordRest } from '../../components/APIs/api'

export default function ResetPassword() {
    const {register, handleSubmit, reset, formState: {errors} } = useForm()
  
    const onSubmit = async (data) => {
        try {
            await RequestPasswordRest(data.email)
            alert('Password reset link sent to the Console') // change this to email in production, and use a liabray like nodeMailer to set this up
            reset()
        } catch (error) {
            console.error('Reset password error: ', error)
            alert(`Failed to request password reset: ${error.message}`)            
        }
    }
  
    return (
    <div>
        <Logo />
        <h2 className='text-3xl text-center' >Replace Password</h2>

        <div className="px-14 py-5">
            <form action="" method='post' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2' >
                <input type="email" name='email' placeholder='Email' {...register('email', {required: "Email address is required for password reset"})}
                    className='bg-white border border-gray-500 py-3 px-5 placeholder:text-xl rounded-md focus-within:outline-none' />
                {errors.email && (
                    <span className='text-red-500' >{errors.email.message || "Email address is required for password reset"}</span>
                )}

                <div className="flex justify-between mt-3">
                    <Button title="Continue" action="submit" bgColor="#7ed0ec" width="fit" />
                    <p className='place-self-end text-lg' >
                        Return to
                        <Link to="/" >
                             <span className='text-blue-600'> Check In</span>
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    </div>
  )
}
