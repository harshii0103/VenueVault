import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

const chip = {
  pending: 'bg-amber-50 text-amber-700 ring-amber-200',
  approved: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  rejected: 'bg-red-50 text-red-700 ring-red-200',
  draft: 'bg-slate-100 text-slate-600 ring-slate-200',
  past: 'bg-slate-100 text-slate-600 ring-slate-200',
  cancelled: 'bg-slate-100 text-slate-500 ring-slate-200',
}

export function StatusChip({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1 ring-inset ${chip[status] || chip.draft}`}>
      {status}
    </span>
  )
}

export function StatCard({ label, value, tone = 'slate', onClick }) {
  const tones = { amber: 'text-amber-600', emerald: 'text-emerald-600', red: 'text-red-600', slate: 'text-[#13203e]' }
  return (
    <button onClick={onClick} className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-[#9f263d]/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-[#9f263d] sm:p-5">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className={`mt-1 font-display text-3xl font-bold ${tones[tone]}`}>{value}</p>
    </button>
  )
}

export const Skeleton = ({ className = '' }) => <div className={`skeleton rounded-xl ${className}`} aria-hidden="true" />

export function EmptyState({ title, text, action }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      <p className="font-display text-lg font-bold text-[#13203e]">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">{text}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

const ToastContext = createContext(() => {})
export const useToast = () => useContext(ToastContext)

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)
  const show = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() })
    setTimeout(() => setToast(null), 3500)
  }, [])
  return (
    <ToastContext.Provider value={show}>
      {children}
      {toast && (
        <div key={toast.id} role="status" className="page-enter fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-[#13203e] px-5 py-3 text-sm font-medium text-white shadow-xl lg:bottom-8">
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function Drawer({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div onClick={onClose} className="fade-in absolute inset-0 bg-black/40" />
      <aside role="dialog" aria-modal="true" aria-label={title} className="drawer-in absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 className="font-display text-xl font-bold">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="rounded-lg px-2 py-1 text-xl leading-none text-slate-400 hover:bg-slate-100">×</button>
        </div>
        {children}
      </aside>
    </div>
  )
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)} className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? 'bg-[#9f263d]' : 'bg-slate-300'}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`} />
    </button>
  )
}

export function ThemeToggle({ dark, onChange }) {
  return (
    <button type="button" role="switch" aria-checked={dark} aria-label="Dark mode" onClick={() => onChange(!dark)}
      className="relative h-9 w-[68px] shrink-0 rounded-full border border-slate-300 bg-gradient-to-b from-slate-300 to-slate-200 shadow-inner dark:border-white/10 dark:from-[#0b1220] dark:to-[#18233a]">
      <span className={`absolute top-1 grid h-7 w-7 place-items-center rounded-full bg-[#fffdfb] text-amber-500 shadow-md ring-1 ring-black/5 transition-all duration-300 dark:bg-[#2a3756] dark:text-sky-200 dark:ring-white/10 ${dark ? 'left-[36px]' : 'left-1'}`}>
        {dark ? <Moon size={15} /> : <Sun size={15} />}
      </span>
    </button>
  )
}

export function Dropdown({ trigger, label, triggerClass = '', width = 'w-72', children }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const away = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', away)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('mousedown', away); document.removeEventListener('keydown', esc) }
  }, [open])
  return (
    <div ref={ref} className="relative">
      <button type="button" aria-label={label} aria-expanded={open} onClick={() => setOpen(!open)} className={triggerClass}>{trigger}</button>
      {open && <div onClick={() => setOpen(false)} className={`page-enter absolute right-0 z-40 mt-2 ${width} rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-[#13203e]/10`}>{children}</div>}
    </div>
  )
}
