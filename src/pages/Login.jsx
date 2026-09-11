import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Landmark, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-[#fdf8f5] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo + Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <Landmark className="text-red-800" size={36} />
          </div>
          <h1 className="font-serif text-2xl font-semibold text-[#0f1c3f]">VenueVault</h1>
          <p className="text-gray-500 text-sm mt-1">Campus Venue Booking</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#0f1c3f] mb-1.5">
                Email / College ID
              </label>
              <input
                type="text"
                placeholder="Enter your email or college ID"
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
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="rounded border-gray-300 text-red-800 focus:ring-red-800" />
                Remember me
              </label>
              <a href="#" className="text-red-800 font-medium hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-red-800 text-white py-2.5 rounded-lg font-medium hover:bg-red-900 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            New user?{' '}
            <Link to="/register" className="text-red-800 font-medium hover:underline">
              Create Account
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Powered by Edge Computing · Maitreyi College
        </p>
      </div>
    </div>
  )
}