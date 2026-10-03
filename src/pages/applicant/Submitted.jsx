import { Link, useParams } from 'react-router-dom'
import { Check, Copy } from 'lucide-react'
import { useToast } from '../../components/ui'
import { StatusChip } from '../../components/ui'
import { bookings } from '../../data/mockData'

export default function Submitted() {
  const { id } = useParams()
  const toast = useToast()
  const b = bookings.find((x) => x.id === id)
  const copy = () => navigator.clipboard?.writeText(id).then(() => toast('Request ID copied'))
  const timeline = [['Submitted', true], ['Under review', false], ['Decision', false]]

  return (
    <div className="mx-auto max-w-md pt-6 text-center">
      <span className="tick mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600"><Check size={32} strokeWidth={3} /></span>
      <h1 className="mt-5 font-display text-2xl font-bold tracking-[-0.02em]">Request submitted successfully!</h1>
      {b && <p className="mt-1 text-slate-500">{b.event} · {b.venue}</p>}
      <div className="mt-6 space-y-3 rounded-2xl border border-slate-200 bg-white p-5 text-left text-sm shadow-sm">
        <div className="flex items-center justify-between"><span className="text-slate-500">Request ID</span>
          <button onClick={copy} className="inline-flex items-center gap-2 font-semibold hover:text-[#9f263d]">{id} <Copy size={14} /></button></div>
        <div className="flex items-center justify-between"><span className="text-slate-500">Status</span><span className="inline-flex items-center gap-2"><StatusChip status="pending" /> Pending approval</span></div>
      </div>
      <ol className="mt-6 flex items-center justify-between text-xs font-semibold">
        {timeline.map(([label, done], i) => (
          <li key={label} className={`flex flex-1 flex-col items-center gap-2 ${done ? 'text-emerald-600' : 'text-slate-400'}`}>
            <span className={`h-3 w-3 rounded-full ${done ? 'bg-emerald-500' : 'bg-slate-300'}`} />{label}
          </li>
        ))}
      </ol>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to="/dashboard/bookings" className="flex-1 rounded-lg bg-[#a42b43] py-2.5 text-sm font-semibold text-white hover:bg-[#b8334d]">Track my request</Link>
        <Link to="/dashboard" className="flex-1 rounded-lg border border-slate-300 bg-white py-2.5 text-sm font-semibold hover:bg-slate-50">Back to dashboard</Link>
      </div>
    </div>
  )
}
