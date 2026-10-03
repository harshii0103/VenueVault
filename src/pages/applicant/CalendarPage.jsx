import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Field, inputCls } from '../../components/auth'
import { venues, getVenue, takenSlots, toISO, todayISO, formatDay, fmtRange } from '../../data/mockData'

const gaps = (list) => { let cur = 8; const out = []; list.forEach((t) => { if (t.start > cur) out.push([cur, t.start]); cur = Math.max(cur, t.end) }); if (cur < 21) out.push([cur, 21]); return out }

export default function CalendarPage() {
  const now = new Date()
  const [month, setMonth] = useState(new Date(now.getFullYear(), now.getMonth(), 1))
  const [venueId, setVenueId] = useState('')
  const [sel, setSel] = useState(todayISO())
  const taken = takenSlots().filter((t) => !venueId || t.venueId === venueId)
  const onDay = (iso) => taken.filter((t) => toISO(t.date) === iso).sort((a, b) => a.start - b.start)
  const y = month.getFullYear(), m = month.getMonth()
  const cells = [...Array(month.getDay()).fill(null), ...Array.from({ length: new Date(y, m + 1, 0).getDate() }, (_, i) => i + 1)]
  const iso = (d) => toISO(new Date(y, m, d))
  const shift = (n) => setMonth(new Date(y, m + n, 1))
  const dayList = onDay(sel)
  const isPastDay = sel < todayISO()

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold tracking-[-0.02em] sm:text-3xl">Venue calendar</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1">
              <button onClick={() => shift(-1)} aria-label="Previous month" className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-100"><ChevronLeft size={18} /></button>
              <h2 className="min-w-36 text-center font-display font-bold">{month.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</h2>
              <button onClick={() => shift(1)} aria-label="Next month" className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-100"><ChevronRight size={18} /></button>
              <button onClick={() => { setMonth(new Date(now.getFullYear(), now.getMonth(), 1)); setSel(todayISO()) }} className="ml-2 rounded-lg px-3 py-1.5 text-sm font-semibold text-[#9f263d] hover:bg-[#9f263d]/10">Today</button>
            </div>
            <select aria-label="Venue" value={venueId} onChange={(e) => setVenueId(e.target.value)} className={`${inputCls()} w-auto`}>
              <option value="">All venues</option>{venues.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400">{['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => <div key={d} className="py-1">{d}</div>)}</div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => d === null ? <div key={i} /> : (
              <button key={i} onClick={() => setSel(iso(d))} className={`relative aspect-square rounded-lg text-sm font-semibold transition sm:aspect-[4/3] ${iso(d) === sel ? 'bg-[#9f263d] text-white' : iso(d) === todayISO() ? 'ring-2 ring-[#9f263d]/40 hover:bg-slate-50' : iso(d) < todayISO() ? 'text-slate-300 hover:bg-slate-50' : 'hover:bg-slate-50'}`}>
                {d}{onDay(iso(d)).length > 0 && <span className={`absolute bottom-1.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full ${iso(d) === sel ? 'bg-white' : 'bg-[#d2697d]'}`} />}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-400"><span className="mr-1 inline-block h-2 w-2 rounded-full bg-[#d2697d]" /> Has bookings</p>
        </section>

        <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-display font-bold">{formatDay(sel)}</h2>
          {dayList.length === 0 && <p className="text-sm text-slate-500">No bookings on this day.</p>}
          <ul className="space-y-2 text-sm">
            {dayList.map((t, i) => (
              <li key={i} className="flex items-center justify-between rounded-lg bg-amber-50 px-3 py-2 text-amber-800">
                <span>{fmtRange(t.start, t.end)}{!venueId && ` · ${getVenue(t.venueId).name}`}</span><span className="font-semibold">Booked</span>
              </li>
            ))}
            {venueId && !isPastDay && gaps(dayList).map(([s, e], i) => (
              <li key={`g${i}`} className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 text-emerald-800">
                <span>{fmtRange(s, e)}</span>
                <Link to={`/dashboard/book?venue=${venueId}&date=${sel}&from=${s}&to=${Math.min(e, s + 2)}`} className="font-semibold underline">+ Book</Link>
              </li>
            ))}
          </ul>
          {!venueId && !isPastDay && <Link to={`/dashboard/venues?date=${sel}`} className="block rounded-lg bg-[#a42b43] py-2.5 text-center text-sm font-semibold text-white hover:bg-[#b8334d]">Find a venue for this day</Link>}
          {!venueId && <p className="text-xs text-slate-400">Pick a venue above to see its free time slots.</p>}
        </section>
      </div>
    </div>
  )
}
