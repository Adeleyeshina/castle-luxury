import axiosInstace from "../util/Axios"

export interface Profile {
    _id: string,
    name: string,
    username: string
}

export interface LoginPayload {
    username: string
    password: string
}

export const login = async (data: LoginPayload) => {
    const response = await axiosInstace.post("auth/login", data)
    return response.data
}
export const logout = async () => {
    const response = await axiosInstace.post("auth/logout", {})
    return response.data
}

export const profile = async (): Promise<Profile> => {
    const response = await axiosInstace.get("auth/profile")
    return response.data
}