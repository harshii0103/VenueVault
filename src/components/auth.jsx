import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Landmark, Eye, EyeOff } from 'lucide-react'

export const inputCls = (invalid) =>
  `w-full rounded-lg border px-4 py-2.5 text-sm text-[#13203e] placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
    invalid
      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
      : 'border-slate-300 focus:border-[#9f263d] focus:ring-[#9f263d]/25'
  }`

export function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f4f3] px-4 py-10 font-sans">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-32 h-96 w-96 rounded-full bg-[#9f263d]/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-[#13203e]/20 blur-3xl" />
      <div className="auth-enter relative mx-auto w-full max-w-md">
        <Link to="/" className="mb-6 inline-block text-sm font-medium text-slate-500 hover:text-[#9f263d]">
          ← Back to home
        </Link>
        <div className="mb-7 text-center">
          <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-[#121f3f] text-white">
            <Landmark size={22} />
          </span>
          <h1 className="font-display text-2xl font-bold tracking-[-0.02em] text-[#101c38]">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
        <div className="rounded-2xl border border-white/70 bg-white/75 p-7 shadow-xl shadow-[#13203e]/10 backdrop-blur-xl sm:p-8">{children}</div>
        {footer}
        <p className="mt-8 text-center text-xs text-slate-500">Powered by Edge Computing · Maitreyi College</p>
      </div>
    </div>
  )
}

export function Field({ id, label, hint, error, optional, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-[#13203e]">
        {label}
        {optional && <span className="font-normal text-slate-400"> (optional)</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
      {error && <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  )
}

export function TextField({ id, label, error, hint, optional, ...props }) {
  return (
    <Field id={id} label={label} error={error} hint={hint} optional={optional}>
      <input id={id} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} className={inputCls(error)} {...props} />
    </Field>
  )
}

export function PasswordField({ id, label, error, hint, ...props }) {
  const [show, setShow] = useState(false)
  return (
    <Field id={id} label={label} error={error} hint={hint}>
      <div className="relative">
        <input id={id} type={show ? 'text' : 'password'} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} className={`${inputCls(error)} pr-11`} {...props} />
        <button
          type="button"
          onClick={() => setShow(!show)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </Field>
  )
}

export function Segmented({ label, options, value, onChange }) {
  return (
    <div role="radiogroup" aria-label={label} className="grid auto-cols-fr grid-flow-col gap-1 rounded-xl bg-slate-100 p-1">
      {options.map(([val, text]) => (
        <button
          key={val}
          type="button"
          role="radio"
          aria-checked={value === val}
          onClick={() => onChange(val)}
          className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${value === val ? 'bg-white text-[#9f263d] shadow-sm' : 'text-slate-500 hover:text-[#13203e]'}`}
        >
          {text}
        </button>
      ))}
    </div>
  )
}

export function Banner({ type = 'error', children }) {
  const cls = type === 'error' ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'
  return <div role={type === 'error' ? 'alert' : 'status'} className={`rounded-lg border px-4 py-3 text-sm ${cls}`}>{children}</div>
}

export function SubmitButton({ loading, children }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#a42b43] py-2.5 font-semibold text-white shadow-lg shadow-black/10 transition hover:bg-[#b8334d] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />}
      {children}
    </button>
  )
}
