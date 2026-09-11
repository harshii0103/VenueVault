import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Landmark, Eye, EyeOff } from 'lucide-react'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState('applicant')

  return (
    <div className="min-h-screen bg-[#fdf8f5] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo + Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <Landmark className="text-red-800" size={36} />
          </div>
          <h1 className="font-serif text-2xl font-semibold text-[#0f1c3f]">Create Account</h1>
          <p className="text-gray-500 text-sm mt-1">Join VenueVault today</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#0f1c3f] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-800/30 focus:border-red-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0f1c3f] mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-800/30 focus:border-red-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0f1c3f] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-800/30 focus:border-red-800 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0f1c3f] mb-2">
                Role
              </label>
              <div className="flex gap-6 text-sm text-gray-600">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="applicant"
                    checked={role === 'applicant'}
                    onChange={(e) => setRole(e.target.value)}
                    className="text-red-800 focus:ring-red-800"
                  />
                  Applicant
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === 'admin'}
                    onChange={(e) => setRole(e.target.value)}
                    className="text-red-800 focus:ring-red-800"
                  />
                  Admin
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-800 text-white py-2.5 rounded-lg font-medium hover:bg-red-900 transition"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-red-800 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}