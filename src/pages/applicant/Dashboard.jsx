import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, CalendarDays, MapPin } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { StatCard, StatusChip, Skeleton, EmptyState } from '../../components/ui'
import { bookings, isPast, formatDate } from '../../data/mockData'

const greeting = () => {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
}

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  // TODO (backend): fetch this user's bookings here instead of the demo delay.
  useEffect(() => { const t = setTimeout(() => setLoading(false), 450); return () => clearTimeout(t) }, [])

  const upcoming = bookings.filter((b) => !isPast(b))
  const count = (s) => upcoming.filter((b) => b.status === s).length
  const next = upcoming.filter((b) => b.status === 'approved').sort((a, b) => a.date - b.date)[0]
  const recent = bookings.slice(0, 4)
  const go = (s) => navigate(`/dashboard/bookings?status=${s}`)

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-[-0.02em] sm:text-3xl">{greeting()}, {user?.name}!</h1>
          <p className="mt-1 text-slate-500">Here's what's happening with your venue requests.</p>
        </div>
        <Link to="/dashboard/venues" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#a42b43] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#9f263d]/20 transition hover:bg-[#b8334d]">
          <Plus size={20} /> Book a Venue
        </Link>
      </div>

      {loading ? (
        <>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-24" />)}</div>
          <Skeleton className="h-28" />
          <Skeleton className="h-56" />
        </>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <StatCard label="Pending" value={count('pending')} tone="amber" onClick={() => go('pending')} />
            <StatCard label="Approved" value={count('approved')} tone="emerald" onClick={() => go('approved')} />
            <StatCard label="Rejected" value={count('rejected')} tone="red" onClick={() => go('rejected')} />
          </div>

          {next && (
            <section className="rounded-2xl bg-[#0c1730] p-5 text-white sm:p-6">
              <p className="text-xs font-bold tracking-[.14em] text-[#e0607a]">NEXT UP</p>
              <h2 className="mt-2 font-display text-xl font-bold">{next.event}</h2>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-slate-300">
                <span className="inline-flex items-center gap-2"><MapPin size={15} /> {next.venue}</span>
                <span className="inline-flex items-center gap-2"><CalendarDays size={15} /> {formatDate(next.date)} · {next.time}</span>
              </div>
            </section>
          )}

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">Recent bookings</h2>
              <Link to="/dashboard/bookings" className="text-sm font-semibold text-[#9f263d] hover:underline">View all</Link>
            </div>
            {recent.length === 0 ? (
              <EmptyState title="No bookings yet" text="Book your first venue and it will show up here." action={<Link to="/dashboard/venues" className="text-sm font-semibold text-[#9f263d] hover:underline">Book a venue →</Link>} />
            ) : (
              <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {recent.map((b) => (
                  <li key={b.id}>
                    <Link to="/dashboard/bookings" className="flex items-center justify-between gap-4 px-4 py-4 transition hover:bg-slate-50 sm:px-5">
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{b.event}</p>
                        <p className="mt-0.5 truncate text-sm text-slate-500">{b.venue} · {formatDate(b.date)} · {b.time}</p>
                      </div>
                      <StatusChip status={b.status} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  )
}
