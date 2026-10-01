import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import { RequireAuth } from './context/AuthContext'
import ApplicantLayout from './layouts/ApplicantLayout'
import Dashboard from './pages/applicant/Dashboard'
import ComingSoon from './pages/applicant/ComingSoon'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/dashboard" element={<RequireAuth><ApplicantLayout /></RequireAuth>}>
        <Route index element={<Dashboard />} />
        <Route path="venues" element={<ComingSoon title="Select a venue" />} />
        <Route path="bookings" element={<ComingSoon title="My bookings" />} />
        <Route path="calendar" element={<ComingSoon title="Calendar" />} />
        <Route path="profile" element={<ComingSoon title="Profile" />} />
      </Route>
    </Routes>
  )
}
