import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Users, Landmark, Sparkles } from 'lucide-react'
import { Field, inputCls } from '../../components/auth'
import { EmptyState } from '../../components/ui'
import { formatDay, venues, venueTypes, timeOptions, tomorrowISO, todayISO, findConflict, matchScore, fmtRange } from '../../data/mockData'

export default function Venues() {
  const navigate = useNavigate()
  const [sp] = useSearchParams()
  const [f, setF] = useState({ date: sp.get('date') || tomorrowISO(), start: 10, end: 12, audience: '', type: '' })
  const set = (k) => (e) => setF({ ...f, [k]: ['start', 'end'].includes(k) ? Number(e.target.value) : e.target.value })
  const audience = Number(f.audience) || 0
  const timeOk = f.start < f.end

  const results = venues
    .filter((v) => v.status === 'active' && (!f.type || v.type === f.type))
    .map((v) => {
      const small = audience > v.capacity
      const busy = !small && f.date && timeOk && !!findConflict({ venueId: v.id, date: f.date, start: f.start, end: f.end })
      return { v, state: small ? 'small' : busy ? 'busy' : 'free', score: matchScore(v, audience) }
    })
    .sort((a, b) => (a.state === 'free' ? 0 : 1) - (b.state === 'free' ? 0 : 1) || (b.score || 0) - (a.score || 0) || a.v.capacity - b.v.capacity)
  const best = audience && results[0]?.state === 'free' ? results[0].v.id : null

  const select = (id) => navigate(`/dashboard/book?${new URLSearchParams({ venue: id, date: f.date, from: f.start, to: f.end, audience: f.audience })}`)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-[-0.02em] sm:text-3xl">Select a venue</h1>
        <p className="mt-1 text-slate-500">Tell us when and how many people — we'll show what's free.</p>
      </div>

      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 sm:p-5 lg:grid-cols-5">
        <Field id="date" label="Date" hint={formatDay(f.date)}><input id="date" type="date" min={todayISO()} value={f.date} onChange={set('date')} className={inputCls()} /></Field>
        <Field id="start" label="From"><select id="start" value={f.start} onChange={set('start')} className={inputCls()}>{timeOptions.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}</select></Field>
        <Field id="end" label="To" error={!timeOk ? 'End must be after start.' : ''}><select id="end" value={f.end} onChange={set('end')} className={inputCls(!timeOk)}>{timeOptions.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}</select></Field>
        <Field id="audience" label="Audience"><input id="audience" type="number" min="1" placeholder="e.g. 120" value={f.audience} onChange={set('audience')} className={inputCls()} /></Field>
        <Field id="type" label="Type"><select id="type" value={f.type} onChange={set('type')} className={inputCls()}><option value="">All types</option>{venueTypes.map((t) => <option key={t}>{t}</option>)}</select></Field>
      </div>

      {results.length === 0 ? (
        <EmptyState title="No venues match" text="Try a different type or clear the filters." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map(({ v, state, score }) => (
            <article key={v.id} className={`flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition ${state === 'free' ? 'border-slate-200 hover:shadow-md' : 'border-slate-200 opacity-70'}`}>
              <div className="relative h-40 bg-[#13203e]">
                {v.image ? <img src={v.image} alt={v.name} loading="lazy" className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-white/40"><Landmark size={40} /></div>}
                {best === v.id && <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#9f263d] px-2.5 py-1 text-xs font-bold text-white"><Sparkles size={12} /> Recommended</span>}
                <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold ${state === 'free' ? 'bg-emerald-50 text-emerald-700' : state === 'busy' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                  {state === 'free' ? 'Available' : state === 'busy' ? 'Booked at this time' : 'Too small'}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-display text-lg font-bold">{v.name}</h2>
                  {score && state === 'free' && <span className="shrink-0 text-sm font-bold text-[#9f263d]">{score}% match</span>}
                </div>
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-slate-500"><Users size={14} /> {v.capacity} seats{audience && state !== 'small' ? ` · fits your ${audience} guests` : ''}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">{v.amenities.map((a) => <span key={a} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">{a}</span>)}</div>
                <button onClick={() => select(v.id)} disabled={state === 'small'} className="mt-5 rounded-lg bg-[#a42b43] py-2.5 text-sm font-semibold text-white transition hover:bg-[#b8334d] disabled:cursor-not-allowed disabled:bg-slate-300">
                  {state === 'busy' ? 'See options' : 'Select venue'}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      {timeOk && <p className="text-xs text-slate-400">Showing availability for {fmtRange(f.start, f.end)}.</p>}
    </div>
  )
}
