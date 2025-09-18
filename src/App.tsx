
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import DashboardLayout from './layout/DashboardLayout'
import Agents from './pages/Agents'
import AddAgent from './pages/AddAgent'
import NotFound from './pages/NotFound'
import UpdateAgent from './pages/UpdateAgent'
import ProtectRoute from './util/ProtectRoute'
import { currentUser } from './hooks/currentUser'
import { PiSpinnerBold } from 'react-icons/pi'
import { useAuthStore } from './store/useAuthStore'



const App = () => {
  const { isLoading } = currentUser()
  const user = useAuthStore((s)=>s.user)

  if (isLoading) {
    return <div className='fixed inset-0 flex items-center justify-center'>
      <PiSpinnerBold className='animate-spin text-5xl text-primary' />
    </div>
  }
  return (
    <Routes>
      <Route path='/login' element={user ? <Navigate to="/"/> :<Login />} />

      <Route element={
        <ProtectRoute>
          <DashboardLayout />
        </ProtectRoute>
      }>
        <Route path='/' element={<Agents />} />
        <Route path='add-agent' element={<AddAgent />} />
        <Route path='update-agent/:id' element={<UpdateAgent />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App