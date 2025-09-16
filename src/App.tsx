
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import DashboardLayout from './layout/DashboardLayout'
import Agents from './pages/Agents'
import AddAgent from './pages/AddAgent'
import NotFound from './pages/NotFound'
import Logout from './pages/Logout'
import UpdateAgent from './pages/UpdateAgent'



const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />

      <Route element={<DashboardLayout />}>
        <Route path='/' element={<Agents />} />
        <Route path='add-agent' element={<AddAgent />} />
        <Route path='update-agent/:id' element={<UpdateAgent />} />
        <Route path='logout' element={<Logout />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App