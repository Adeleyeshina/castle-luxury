import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import {fetchSingleAgent, updateAgent } from '../api/agentService';
import toast from 'react-hot-toast';
import type { AgentProps } from '../api/agentService';
import { useNavigate, useParams } from 'react-router-dom';
import { PiSpinnerBold } from 'react-icons/pi';
import { useEffect } from 'react';




const UpdateAgent = () => {

  const params = useParams()
  const id = params.id
  const agentFields: { name: keyof AgentProps; label: string }[] = [
    { name: 'name', label: 'Agent Name' },
    { name: 'contact', label: 'Agent Contact' },
    { name: 'occupation', label: 'Occupation' },
    { name: 'location', label: 'Location' },
  ];
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AgentProps>();

  const {data, isLoading, isError, error} = useQuery({
    queryKey : ['singleAgent', id],
    queryFn : ()=> fetchSingleAgent(id as string),
    enabled : !!id
  })

      const {mutate, isPending} = useMutation({
        mutationKey : ['updateData'],
        mutationFn : updateAgent,
        onSuccess : (response : any)=> {
            toast.success(response.message || 'Agent updated successfully')
            navigate("/")
            queryClient.invalidateQueries({
              queryKey : ["allAgent"]
            })
          
        },
        onError : (error) => {
            toast.error(error.message || 'An error occured while updating data')
        }
    })

    const onSubmit: SubmitHandler<AgentProps> = (data) => {
        mutate(data)
    
    };
    useEffect(() => {
  if (data) {
    reset(data);
  }
}, [data, reset]);

  if (isLoading) {
    return <div className='grid justify-center'>
      <PiSpinnerBold className='animate-spin text-4xl text-primary'/>
    </div>
  }

  if (isError) {
    return <div className='grid justify-center'>
      <p className='text-red-600'>{error?.message || 'Error fetching agent data.'}</p>
    </div>
  }



  return (
            <div className="max-w-6xl mx-auto p-4">
            <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                </div>
                <div>
                    <h1 className="text-xl font-medium text-gray-800">Update Agent Data</h1>
                    <p className="text-sm text-gray-500">Fill the fields below</p>
                </div>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            {data && <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {agentFields.map(({ name, label }) => (
                        <div key={name}>
                            <label
                                htmlFor={name}
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                {label}
                            </label>
                            <input
                                type="text"
                                autoComplete='off'
                                id={name}
                                className={`w-full p-3 bg-white rounded border ${errors[name] ? 'border-red-500' : 'border-gray-400'
                                    } text-black focus:outline-none focus:border-primary transition-colors`}
                                {...register(name, { required: `${label} is required` })}
                            />
                            {errors[name] && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors[name]?.message}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <div className='flex justify-center w-full'>
                    <button
                    disabled={isPending}
                        type="submit"
                        className="mt-6 disabled:opacity-[.7] cursor-pointer font-semibold text-center items-center px-10 py-2 flex bg-primary text-white rounded hover:bg-primary-dark transition-colors hover:opacity-[0.7]"
                    >
                        {isPending ? "Updating..." : "Update Data"}
                    </button>
                </div>

            </form> }
        </div>
  )
}

export default UpdateAgent