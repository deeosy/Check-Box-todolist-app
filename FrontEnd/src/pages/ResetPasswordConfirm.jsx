import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { ConfirmPasswordReset } from '../../components/APIs/api'
import Logo from '../../components/Logo'
import Button from '../../components/Button'

export default function ResetPasswordConfirm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const { token } = useParams()  // get token from URL
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            await ConfirmPasswordReset(token, data.newPassword)
            alert('Password reset successfully. Please log in.')
            reset()
            navigate('/')
        } catch (error) {
            console.error('Reset password confirm error: ', error)
            alert(`Failed to reset password: ${error.message}`)
        }
    }

  return (
        <div className="max-w-xl mx-auto">
            <Logo />
            <h2 className="text-3xl text-center">Set New Password</h2>
            <div className="px-14 py-5">
                <form
                    action=""
                    method="post"
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-2"
                >
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        {...register('newPassword', {
                            required: "New password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        className="bg-white border border-gray-500 py-3 px-5 placeholder:text-xl rounded-md focus-within:outline-none"
                    />
                    {errors.newPassword && (
                        <span className="text-red-500">{errors.newPassword.message}</span>
                    )}
                    <div className="flex justify-between mt-3">
                        <Button title="Submit" action="submit" bgColor="#7ed0ec" width="fit" />
                    </div>
                </form>
            </div>
        </div>
  )
}
