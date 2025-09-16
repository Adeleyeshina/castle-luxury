

import axiosInstace from "../util/Axios";


export type AgentProps = {
    _id?: string;
    name: string;
    contact: string;
    occupation: string;
    location: string;
    createdAt?: string,
    updatedAt?: string,
    __v?: string
}

export const allAgent = async (): Promise<AgentProps[]> => {
    const response = await axiosInstace.get("/allAgent")
    return Array.isArray(response.data) ? response.data : response.data.agents || [];
}

export const addAgent = async (data: AgentProps) => {
    const response = await axiosInstace.post("/addAgent", data)
    return response.data
}

export const fetchSingleAgent = async (id: string): Promise<AgentProps> => {
    const response = await axiosInstace.get(`/agent/${id}`)
    return response.data
}

export const updateAgent = async (data: AgentProps) => {
    const response = await axiosInstace.put(`/updateAgent/${data._id}`, data)
    return response.data
}
export const deleteAgent = async (id : string) => {
    const response = await axiosInstace.delete(`/deleteAgent/${id}`)
    return response.data
}