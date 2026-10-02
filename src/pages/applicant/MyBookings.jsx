import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { StatusChip, EmptyState, Drawer, useToast } from '../../components/ui'
import { bookings, isPast, formatDate, cancelBooking } from '../../data/mockData'

const tabs = [['all', 'All'], ['pending', 'Pending'], ['approved', 'Approved'], ['rejected', 'Rejected'], ['draft', 'Drafts'], ['past', 'Past']]
const tabOf = (b) => (b.status === 'approved' && isPast(b) ? 'past' : b.status)

export default function MyBookings() {
  const [sp, setSp] = useSearchParams()
  const toast = useToast()
  const [, refresh] = useState(0)
  const [open, setOpen] = useState(null)
  const [confirming, setConfirming] = useState(false)
  const tab = tabs.some(([k]) => k === sp.get('status')) ? sp.get('status') : 'all'
  const list = bookings.filter((b) => tab === 'all' || tabOf(b) === tab)
  const close = () => { setOpen(null); setConfirming(false) }
  const doCancel = () => { cancelBooking(open.id); toast('Request cancelled'); close(); refresh((n) => n + 1) }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold tracking-[-0.02em] sm:text-3xl">My bookings</h1>
      <div role="tablist" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        {tabs.map(([k, label]) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => setSp(k === 'all' ? {} : { status: k }, { replace: true })}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition ${tab === k ? 'bg-[#13203e] text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'}`}>{label}</button>
        ))}
      </div>

      {list.length === 0 ? (
        <EmptyState title="Nothing here yet" text="No bookings in this category." action={<Link to="/dashboard/venues" className="text-sm font-semibold text-[#9f263d] hover:underline">Book a venue →</Link>} />
      ) : (
        <ul className="space-y-3">
          {list.map((b) => (
            <li key={b.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="min-w-0">
                <div className="flex items-center gap-3"><p className="truncate font-semibold">{b.event}</p><StatusChip status={tabOf(b)} /></div>
                <p className="mt-1 text-sm text-slate-500">{b.venue} · {formatDate(b.date)} · {b.time}</p>
                <p className="text-sm text-slate-500">Audience: {b.audience}</p>
              </div>
              <button onClick={() => setOpen(b)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50">View details</button>
            </li>
          ))}
        </ul>
      )}

      <Drawer open={!!open} onClose={close} title={open?.event || ''}>
        {open && (
          <div className="space-y-5">
            <StatusChip status={tabOf(open)} />
            <dl className="divide-y divide-slate-100 text-sm">
              {[['Request ID', open.id], ['Venue', open.venue], ['Date', formatDate(open.date)], ['Time', open.time], ['Audience', open.audience], ['Society / Department', open.dept || '—'], ['Description', open.desc || '—'], ['Requirements', open.reqs?.join(', ') || 'None']].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 py-3"><dt className="text-slate-500">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
              ))}
            </dl>
            {open.status === 'pending' && (confirming ? (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm">
                <p className="font-semibold text-red-800">Cancel this request?</p>
                <div className="mt-3 flex gap-3">
                  <button onClick={doCancel} className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700">Yes, cancel</button>
                  <button onClick={() => setConfirming(false)} className="rounded-lg px-4 py-2 font-semibold text-slate-600 hover:bg-white">Keep it</button>
                </div>
              </div>
            ) : <button onClick={() => setConfirming(true)} className="w-full rounded-lg border border-red-200 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50">Cancel request</button>)}
          </div>
        )}
      </Drawer>
    </div>
  )
}
