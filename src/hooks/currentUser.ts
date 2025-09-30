import {  useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../store/useAuthStore'
import { profile } from '../api/authService'
import type { Profile } from '../api/authService'
import { useEffect } from 'react'

export const currentUser = () => {
    const setUser = useAuthStore.getState().setUser
    const user = useAuthStore.getState().user

    const query = useQuery<Profile>({
        queryKey: ['me'],
        queryFn: profile,
        staleTime: 1000 * 60 * 10,
        retry : false,
        enabled : !!user
    })
    useEffect(()=> {
        if(query.data) {
            setUser(query.data)
        }else if(query.isError){
            setUser(null)
        }
    },[query.isError, setUser])
    return query
}

