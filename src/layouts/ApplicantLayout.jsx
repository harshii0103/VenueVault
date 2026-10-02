import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, CalendarPlus, ClipboardList, CalendarDays, User, Bell, LogOut, Landmark, Search, Plus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../hooks/useTheme'
import { ToastProvider, Dropdown, ThemeToggle } from '../components/ui'
import { bookings, isPast } from '../data/mockData'

const nav = [
  { to: '/dashboard', label: 'Dashboard', short: 'Home', icon: LayoutDashboard, end: true },
  { to: '/dashboard/venues', label: 'Book a venue', short: 'Book', icon: CalendarPlus },
  { to: '/dashboard/bookings', label: 'My bookings', short: 'Bookings', icon: ClipboardList },
  { to: '/dashboard/calendar', label: 'Calendar', short: 'Calendar', icon: CalendarDays },
  { to: '/dashboard/profile', label: 'Profile', short: 'Profile', icon: User },
]
const msg = { approved: 'was approved', rejected: 'was rejected', pending: 'is awaiting approval', draft: 'is saved as a draft' }

export default function ApplicantLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [dark, setDark] = useTheme()
  const [q, setQ] = useState('')
  const handleLogout = () => { logout(); navigate('/login') }
  const search = (e) => { e.preventDefault(); navigate(`/dashboard/bookings${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''}`) }
  // TODO (backend): replace with real notifications.
  const notes = bookings.filter((b) => msg[b.status] && !isPast(b)).slice(0, 4)

  return (
    <ToastProvider>
      <div className={`${dark ? 'dark' : ''} min-h-screen bg-[#f7f4f3] font-sans text-[#13203e]`}>
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
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-slate-200/70 bg-[#f7f4f3]/80 px-4 backdrop-blur-lg sm:px-6">
            <span className="font-display text-lg font-bold lg:hidden">Venue<span className="text-[#9f263d]">Vault</span></span>
            <span className="hidden whitespace-nowrap text-sm text-slate-500 xl:block">{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
            <form onSubmit={search} role="search" className="relative ml-auto hidden max-w-sm flex-1 md:block">
              <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search your bookings" aria-label="Search your bookings"
                className="w-full rounded-full border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm placeholder:text-slate-400 focus:border-[#9f263d] focus:outline-none focus:ring-2 focus:ring-[#9f263d]/20" />
            </form>
            <div className="ml-auto flex items-center gap-2 sm:gap-3 md:ml-0">
              <Link to="/dashboard/venues" className="hidden items-center gap-1.5 rounded-full bg-[#a42b43] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#b8334d] md:inline-flex"><Plus size={16} /> Book</Link>
              <ThemeToggle dark={dark} onChange={setDark} />
              <Dropdown label="Notifications" triggerClass="relative grid h-10 w-10 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100" trigger={<><Bell size={19} />{notes.length > 0 && <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#9f263d]" />}</>}>
                <p className="px-3 py-2 text-xs font-bold tracking-[.12em] text-slate-400">NOTIFICATIONS</p>
                {notes.length === 0 && <p className="px-3 py-4 text-sm text-slate-500">You're all caught up.</p>}
                {notes.map((b) => (
                  <Link key={b.id} to="/dashboard/bookings" className="block rounded-xl px-3 py-2.5 text-sm hover:bg-slate-100">
                    <span className="font-semibold">{b.event}</span> <span className="text-slate-500">{msg[b.status]}</span>
                  </Link>
                ))}
              </Dropdown>
              <Dropdown label="Account menu" triggerClass="grid h-9 w-9 place-items-center rounded-full bg-[#13203e] text-sm font-bold text-white ring-2 ring-transparent transition hover:ring-[#9f263d]/40" width="w-64" trigger={user?.name?.[0]?.toUpperCase() || 'U'}>
                <div className="border-b border-slate-100 px-3 pb-3 pt-2"><p className="font-semibold">{user?.name}</p><p className="truncate text-sm text-slate-500">{user?.email}</p></div>
                <Link to="/dashboard/profile" className="mt-1 flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm hover:bg-slate-100"><User size={16} /> Profile</Link>
                <button onClick={handleLogout} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm hover:bg-slate-100"><LogOut size={16} /> Logout</button>
              </Dropdown>
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
