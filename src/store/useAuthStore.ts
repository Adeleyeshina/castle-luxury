import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type User = {
    _id: string
    username: string
    name: string
}

type AuthStore = {
    user: User | null
    setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
    }
  )
)