import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { login, type LoginPayload } from '../api/authService'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/useAuthStore'






const Login = () => {
  const setUser = useAuthStore((state)=> state.setUser)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>()
  const [showPassword, setShowPassword] = useState(false)

  const mutation = useMutation({
    mutationKey : ['login'],
    mutationFn : login,
    onSuccess : (data)=> {
      setUser(data)
      navigate ("/")
    },
    onError : (error : any) => {
      toast.error(error.response.data.message || 'Error loggin in')
    },
    retry : false
  })

  const onSubmit : SubmitHandler<LoginPayload>  = (data) => {
    mutation.mutate(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-md p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-primary text-center">Login</h2>

        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            placeholder='username'
            type="text"
            {...register('username', { required: 'Username is required' })}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary ${errors.username ? 'border-red-500' : 'border-primary'
              }`}
          />
          {errors.username && (
            <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6 ">
          <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <div className='relative'>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="password"
              {...register('password', { required: 'Password is required' })}
              className={`w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary ${errors.password ? 'border-red-500' : 'border-primary'
                }`}
            />
            <div
              className="absolute inset-y-0 right-3 grid items-center cursor-pointer text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-primary cursor-pointer text-white py-2 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {mutation.isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login
