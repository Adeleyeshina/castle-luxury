import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

interface AgentProps {
    name: string;
    contact: string;
    occupation: string;
    location: string;
}

const agentFields: { name: keyof AgentProps; label: string }[] = [
    { name: 'name', label: 'Agent Name' },
    { name: 'contact', label: 'Agent Contact' },
    { name: 'occupation', label: 'Occupation' },
    { name: 'location', label: 'Location' },
];

const AddAgent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AgentProps>();

    const onSubmit: SubmitHandler<AgentProps> = (data) => {
        alert(JSON.stringify(data));
    };

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
                    <h1 className="text-xl font-medium text-gray-800">Add New Agent</h1>
                    <p className="text-sm text-gray-500">Fill the fields below</p>
                </div>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            <form onSubmit={handleSubmit(onSubmit)}>
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
                        type="submit"
                        className="mt-6 cursor-pointer text-center items-center px-10 py-2 flex bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                    >
                        Submit
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddAgent;
