import type React from "react"
import { useAuthStore } from "../store/useAuthStore"
import { Navigate } from "react-router-dom"

interface ProtectedProps {
    children: React.ReactNode
}
const ProtectRoute: React.FC<ProtectedProps> = ({ children }) => {
    const user = useAuthStore((s) => s.user)
    if (!user) return <Navigate to={"/login"} replace />
    return (
        <>{children}</>
    )
}

export default ProtectRoute