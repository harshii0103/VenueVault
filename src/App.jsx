import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import { RequireAuth } from './context/AuthContext'
import ApplicantLayout from './layouts/ApplicantLayout'
import Dashboard from './pages/applicant/Dashboard'
import Venues from './pages/applicant/Venues'
import BookingForm from './pages/applicant/BookingForm'
import Submitted from './pages/applicant/Submitted'
import MyBookings from './pages/applicant/MyBookings'
import CalendarPage from './pages/applicant/CalendarPage'
import Profile from './pages/applicant/Profile'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/dashboard" element={<RequireAuth><ApplicantLayout /></RequireAuth>}>
        <Route index element={<Dashboard />} />
        <Route path="venues" element={<Venues />} />
        <Route path="book" element={<BookingForm />} />
        <Route path="submitted/:id" element={<Submitted />} />
        <Route path="bookings" element={<MyBookings />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}
