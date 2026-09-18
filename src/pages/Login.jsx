import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Landmark, Eye, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-md"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Logo + Title */}
        <motion.div variants={item} className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#121f3f] text-white">
              <Landmark size={22} />
            </span>
          </div>
          <h1 className="font-display text-2xl font-bold tracking-[-0.02em] text-[#101c38]">
            Venue<span className="text-[#9f263d]">Vault</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">Campus Venue Booking</p>
        </motion.div>

        {/* Card */}
        <motion.div
          variants={item}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
        >
          <form className="space-y-5">
            <motion.div variants={item}>
              <label className="block text-sm font-medium text-[#13203e] mb-1.5">
                Email / College ID
              </label>
              <input
                type="text"
                placeholder="Enter your email or college ID"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#9f263d]/25 focus:border-[#9f263d]"
              />
            </motion.div>

            <motion.div variants={item}>
              <label className="block text-sm font-medium text-[#13203e] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#9f263d]/25 focus:border-[#9f263d] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-[#9f263d] focus:ring-[#9f263d]"
                />
                Remember me
              </label>
              <a href="#" className="text-[#9f263d] font-semibold hover:underline">
                Forgot Password?
              </a>
            </motion.div>

            <motion.button
              variants={item}
              type="submit"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#a42b43] text-white py-2.5 rounded-lg font-semibold shadow-lg shadow-black/10 hover:bg-[#b8334d] transition"
            >
              Login
            </motion.button>
          </form>

          <motion.p variants={item} className="text-center text-sm text-slate-500 mt-6">
            New user?{' '}
            <Link to="/register" className="text-[#9f263d] font-semibold hover:underline">
              Create Account
            </Link>
          </motion.p>
        </motion.div>

        <motion.p variants={item} className="text-center text-xs text-slate-400 mt-8">
          Powered by Edge Computing · Maitreyi College
        </motion.p>
      </motion.div>
    </div>
  )
}