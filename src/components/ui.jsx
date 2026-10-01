import { createContext, useCallback, useContext, useState } from 'react'

const chip = {
  pending: 'bg-amber-50 text-amber-700 ring-amber-200',
  approved: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  rejected: 'bg-red-50 text-red-700 ring-red-200',
  draft: 'bg-slate-100 text-slate-600 ring-slate-200',
  past: 'bg-slate-100 text-slate-600 ring-slate-200',
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
