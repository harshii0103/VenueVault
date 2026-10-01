import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { TriangleAlert, Check } from 'lucide-react'
import { Field, TextField, inputCls, Banner } from '../../components/auth'
import { useToast } from '../../components/ui'
import { venues, getVenue, timeOptions, todayISO, fromISO, formatDate, fmtRange, findConflict, suggestAlternatives, addBooking } from '../../data/mockData'

const steps = ['Venue & time', 'Event details', 'Review']
const reqs = ['Projector', 'Mic', 'Board']

export default function BookingForm() {
  const [q] = useSearchParams()
  const navigate = useNavigate()
  const toast = useToast()
  const [step, setStep] = useState(0)
  const [showConflict, setShowConflict] = useState(false)
  const [errors, setErrors] = useState({})
  const [f, setF] = useState({
    venueId: getVenue(q.get('venue')) ? q.get('venue') : '', date: q.get('date') || '', start: Number(q.get('from')) || 10, end: Number(q.get('to')) || 12,
    event: '', dept: '', audience: q.get('audience') || '', desc: '', reqs: [],
  })
  const set = (k) => (e) => setF({ ...f, [k]: ['start', 'end'].includes(k) ? Number(e.target.value) : e.target.value })
  const venue = getVenue(f.venueId)
  const slot = { venueId: f.venueId, date: f.date, start: f.start, end: f.end }
  const slotValid = f.venueId && f.date >= todayISO() && f.start < f.end
  const conflict = slotValid ? findConflict(slot) : null

  const validate = () => {
    const e = {}
    if (step === 0) {
      if (!f.venueId) e.venueId = 'Choose a venue.'
      if (!f.date || f.date < todayISO()) e.date = 'Choose a date from today onwards.'
      if (f.start >= f.end) e.end = 'End time must be after start time.'
    }
    if (step === 1) {
      if (!f.event.trim()) e.event = 'Enter the event name.'
      if (!f.dept.trim()) e.dept = 'Enter your society or department.'
      const a = Number(f.audience)
      if (!a || a < 1) e.audience = 'Enter the expected audience.'
      else if (venue && a > venue.capacity) e.audience = `${venue.name} seats ${venue.capacity}. Reduce the audience or pick a bigger venue.`
    }
    setErrors(e)
    return !Object.keys(e).length
  }
  const next = () => { if (validate() && !conflict) setStep(step + 1) }

  const save = (status) => {
    if (status === 'pending' && conflict) return setShowConflict(true)
    const b = addBooking({ venueId: f.venueId, venue: venue.name, event: f.event || 'Untitled event', date: fromISO(f.date), start: f.start, end: f.end, time: fmtRange(f.start, f.end), audience: Number(f.audience) || 0, dept: f.dept, desc: f.desc, reqs: f.reqs, status })
    // TODO (backend): POST the booking instead of addBooking().
    if (status === 'draft') { toast('Draft saved'); navigate('/dashboard') } else navigate(`/dashboard/submitted/${b.id}`)
  }

  if (showConflict && conflict) {
    const alts = suggestAlternatives(slot, Number(f.audience) || 0)
    return (
      <div className="mx-auto max-w-2xl space-y-5">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="inline-flex items-center gap-2 font-display text-lg font-bold text-amber-800"><TriangleAlert size={20} /> Booking conflict detected</p>
          <p className="mt-1 text-sm text-amber-800">This slot is already booked or overlaps another request.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm">
          <p className="font-semibold">{venue.name}</p>
          <p className="mt-1 text-slate-500">{formatDate(conflict.date)} · {fmtRange(conflict.start, conflict.end)}</p>
          <p className="mt-1 text-slate-500">{conflict.event ? `Your request: ${conflict.event}` : 'Reserved for another event'}</p>
        </div>
        <section>
          <h2 className="mb-3 font-display text-lg font-bold">Suggested alternatives</h2>
          {alts.length === 0 ? <p className="text-sm text-slate-500">No other venue is free at this time. Try changing the date or time.</p> : (
            <ul className="space-y-3">{alts.map((v) => (
              <li key={v.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <div><p className="font-semibold">{v.name}</p><p className="text-sm text-slate-500">{v.capacity} seats · free at {fmtRange(f.start, f.end)}</p></div>
                <button onClick={() => { setF({ ...f, venueId: v.id }); setShowConflict(false) }} className="rounded-lg bg-[#a42b43] px-4 py-2 text-sm font-semibold text-white hover:bg-[#b8334d]">Choose</button>
              </li>))}</ul>
          )}
        </section>
        <div className="flex gap-3">
          <button onClick={() => { setShowConflict(false); setStep(0) }} className="flex-1 rounded-lg border border-slate-300 bg-white py-2.5 text-sm font-semibold hover:bg-slate-50">Change date / time</button>
          <button onClick={() => navigate('/dashboard/venues')} className="flex-1 rounded-lg py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100">Cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link to="/dashboard/venues" className="text-sm font-medium text-slate-500 hover:text-[#9f263d]">← Back to venues</Link>
        <h1 className="mt-2 font-display text-2xl font-bold tracking-[-0.02em] sm:text-3xl">New booking request</h1>
      </div>
      <ol className="flex items-center gap-2 text-sm font-semibold">
        {steps.map((s, i) => (
          <li key={s} className={`flex flex-1 items-center gap-2 ${i <= step ? 'text-[#9f263d]' : 'text-slate-400'}`}>
            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs ${i < step ? 'bg-[#9f263d] text-white' : i === step ? 'border-2 border-[#9f263d]' : 'border-2 border-slate-300'}`}>{i < step ? <Check size={14} /> : i + 1}</span>
            <span className="hidden sm:inline">{s}</span>
          </li>
        ))}
      </ol>

      <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        {step === 0 && (<>
          <Field id="venueId" label="Venue" error={errors.venueId}>
            <select id="venueId" value={f.venueId} onChange={set('venueId')} className={inputCls(errors.venueId)}>
              <option value="">Select a venue</option>{venues.map((v) => <option key={v.id} value={v.id}>{v.name} ({v.capacity} seats)</option>)}
            </select>
          </Field>
          <Field id="date" label="Date" error={errors.date}><input id="date" type="date" min={todayISO()} value={f.date} onChange={set('date')} className={inputCls(errors.date)} /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field id="start" label="From"><select id="start" value={f.start} onChange={set('start')} className={inputCls()}>{timeOptions.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}</select></Field>
            <Field id="end" label="To" error={errors.end}><select id="end" value={f.end} onChange={set('end')} className={inputCls(errors.end)}>{timeOptions.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}</select></Field>
          </div>
          {conflict && (
            <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <span className="inline-flex items-center gap-2"><TriangleAlert size={16} /> This slot is already booked.</span>
              <button onClick={() => setShowConflict(true)} className="font-semibold underline">See options</button>
            </div>
          )}
          {slotValid && !conflict && <Banner type="success">{venue.name} is free at this time.</Banner>}
        </>)}

        {step === 1 && (<>
          <TextField id="event" label="Event name *" placeholder="e.g. Coding Workshop" value={f.event} onChange={set('event')} error={errors.event} />
          <TextField id="dept" label="Society / Department *" placeholder="e.g. Computer Science Society" value={f.dept} onChange={set('dept')} error={errors.dept} />
          <TextField id="audience" type="number" min="1" label="Expected audience *" hint={venue ? `${venue.name} seats ${venue.capacity}.` : ''} value={f.audience} onChange={set('audience')} error={errors.audience} />
          <Field id="desc" label="Event description" optional><textarea id="desc" rows="3" value={f.desc} onChange={set('desc')} className={inputCls()} /></Field>
          <fieldset><legend className="mb-2 text-sm font-medium">Additional requirements</legend>
            <div className="flex flex-wrap gap-4">{reqs.map((r) => (
              <label key={r} className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" checked={f.reqs.includes(r)} onChange={() => setF({ ...f, reqs: f.reqs.includes(r) ? f.reqs.filter((x) => x !== r) : [...f.reqs, r] })} className="rounded border-slate-300 text-[#9f263d] focus:ring-[#9f263d]" /> {r}
              </label>))}</div>
          </fieldset>
        </>)}

        {step === 2 && (
          <dl className="divide-y divide-slate-100 text-sm">
            {[['Venue', venue.name], ['Date & time', `${formatDate(fromISO(f.date))} · ${fmtRange(f.start, f.end)}`], ['Event', f.event], ['Society / Department', f.dept], ['Expected audience', f.audience], ['Description', f.desc || '—'], ['Requirements', f.reqs.join(', ') || 'None']].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 py-3"><dt className="text-slate-500">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
            ))}
          </dl>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button onClick={() => (step === 0 ? navigate('/dashboard/venues') : setStep(step - 1))} className="rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100">{step === 0 ? 'Cancel' : 'Back'}</button>
        {step < 2 ? (
          <button onClick={next} disabled={!!conflict} className="rounded-lg bg-[#a42b43] px-8 py-2.5 text-sm font-semibold text-white hover:bg-[#b8334d] disabled:cursor-not-allowed disabled:bg-slate-300">Next</button>
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row">
            <button onClick={() => save('draft')} className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold hover:bg-slate-50">Save as draft</button>
            <button onClick={() => save('pending')} className="rounded-lg bg-[#a42b43] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#b8334d]">Submit for approval</button>
          </div>
        )}
      </div>
    </div>
  )
}
