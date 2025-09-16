

import axiosInstace from "../util/Axios";


export type AgentProps = {
    _id?: string;
    name: string;
    contact: string;
    occupation: string;
    location: string;
    createdAt? : string,
    updatedAt ? : string,
    __v? : string
}

export const allAgent = async (): Promise<AgentProps[]> => {
    const response = await axiosInstace.get("/allAgent")
    return Array.isArray(response.data) ? response.data : response.data.agents || [];
}

export const addAgent = async (data:AgentProps) => {
      const response = await axiosInstace.post("/addAgent", data)
    return response.data
}