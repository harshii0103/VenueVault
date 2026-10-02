import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, CalendarPlus, ClipboardList, CalendarDays, User, Bell, LogOut, Landmark } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { ToastProvider } from '../components/ui'

const nav = [
  { to: '/dashboard', label: 'Dashboard', short: 'Home', icon: LayoutDashboard, end: true },
  { to: '/dashboard/venues', label: 'Book a venue', short: 'Book', icon: CalendarPlus },
  { to: '/dashboard/bookings', label: 'My bookings', short: 'Bookings', icon: ClipboardList },
  { to: '/dashboard/calendar', label: 'Calendar', short: 'Calendar', icon: CalendarDays },
  { to: '/dashboard/profile', label: 'Profile', short: 'Profile', icon: User },
]

export default function ApplicantLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#f7f4f3] font-sans text-[#13203e]">
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-[#0c1730] px-4 py-6 text-slate-300 lg:flex">
          <div className="mb-8 flex items-center gap-2.5 px-2 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10"><Landmark size={18} /></span>
            <span className="font-display text-lg font-bold">Venue<span className="text-[#e0607a]">Vault</span></span>
          </div>
          <nav className="flex flex-1 flex-col gap-1">
            {nav.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive ? 'bg-[#9f263d] text-white' : 'hover:bg-white/10 hover:text-white'}`}>
                <Icon size={18} /> {label}
              </NavLink>
            ))}
          </nav>
          <button onClick={handleLogout} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-white/10 hover:text-white">
            <LogOut size={18} /> Logout
          </button>
        </aside>

        <div className="lg:pl-64">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200/70 bg-[#f7f4f3]/80 px-4 backdrop-blur-lg sm:px-6">
            <span className="font-display text-lg font-bold lg:hidden">Venue<span className="text-[#9f263d]">Vault</span></span>
            <span className="hidden text-sm text-slate-500 lg:block">{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
            <div className="flex items-center gap-3">
              <button aria-label="Notifications" className="grid h-10 w-10 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100"><Bell size={19} /></button>
              <NavLink to="/dashboard/profile" aria-label="Profile" className="grid h-9 w-9 place-items-center rounded-full bg-[#13203e] text-sm font-bold text-white">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </NavLink>
            </div>
          </header>
          <main className="mx-auto max-w-5xl px-4 pb-28 pt-6 sm:px-6 lg:pb-10">
            <div key={pathname} className="page-enter"><Outlet /></div>
          </main>
        </div>

        <nav className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-30 grid grid-cols-5 gap-1 rounded-2xl border border-slate-200/80 bg-white/90 p-1.5 shadow-xl shadow-[#13203e]/15 backdrop-blur-lg lg:hidden">
          {nav.map(({ to, short, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `flex flex-col items-center gap-0.5 rounded-xl py-2 text-[11px] font-semibold transition ${isActive ? 'bg-[#9f263d]/10 text-[#9f263d]' : 'text-slate-500'}`}>
              <Icon size={20} /> {short}
            </NavLink>
          ))}
        </nav>
      </div>
    </ToastProvider>
  )
}
