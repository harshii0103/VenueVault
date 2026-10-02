import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { TextField, PasswordField, SubmitButton } from '../../components/auth'
import { Toggle, useToast } from '../../components/ui'
import { currentUser } from '../../data/mockData'

export default function Profile() {
  const { user, updateUser, logout } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const u = { ...currentUser, ...user }
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(u)
  const [notify, setNotify] = useState(true)
  const [pw, setPw] = useState({ cur: '', next: '', confirm: '' })
  const [pwErr, setPwErr] = useState({})
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const save = () => { updateUser(form); setEditing(false); toast('Profile updated') } // TODO (backend): save to API
  const changePw = (e) => {
    e.preventDefault()
    const err = {}
    if (!pw.cur) err.cur = 'Enter your current password.'
    if (pw.next.length < 8) err.next = 'Use at least 8 characters.'
    if (pw.confirm !== pw.next) err.confirm = 'Passwords do not match.'
    setPwErr(err)
    if (Object.keys(err).length) return
    setPw({ cur: '', next: '', confirm: '' }) // TODO (backend): call change-password API
    toast('Password updated')
  }
  const fields = [['name', 'Full name'], ['email', 'Email'], ['collegeId', 'College ID'], ['course', 'Course'], ['semester', 'Semester'], ['phone', 'Contact no.']]

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-[#13203e] font-display text-2xl font-bold text-white">{u.name?.[0]?.toUpperCase()}</span>
        <div><h1 className="font-display text-2xl font-bold tracking-[-0.02em]">{u.name}</h1><p className="text-sm text-slate-500">{u.course} · {u.collegeId}</p></div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center justify-between"><h2 className="font-display font-bold">Personal info</h2>
          {!editing && <button onClick={() => { setForm(u); setEditing(true) }} className="text-sm font-semibold text-[#9f263d] hover:underline">Edit profile</button>}</div>
        {editing ? (
          <div className="space-y-4">
            {fields.map(([k, label]) => <TextField key={k} id={k} label={label} value={form[k] || ''} onChange={set(k)} disabled={k === 'email' || k === 'collegeId'} />)}
            <div className="flex gap-3"><button onClick={save} className="rounded-lg bg-[#a42b43] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#b8334d]">Save</button>
              <button onClick={() => setEditing(false)} className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel</button></div>
          </div>
        ) : (
          <dl className="divide-y divide-slate-100 text-sm">{fields.map(([k, label]) => <div key={k} className="flex justify-between gap-6 py-3"><dt className="text-slate-500">{label}</dt><dd className="font-medium">{u[k] || '—'}</dd></div>)}</dl>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-4 font-display font-bold">Account settings</h2>
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4 text-sm">
          <div><p className="font-medium">Email notifications</p><p className="text-slate-500">Get updates when a request is approved or rejected.</p></div>
          <Toggle checked={notify} onChange={setNotify} label="Email notifications" />
        </div>
        <form onSubmit={changePw} noValidate className="space-y-4 pt-4">
          <p className="text-sm font-medium">Change password</p>
          <PasswordField id="cur" label="Current password" autoComplete="current-password" value={pw.cur} onChange={(e) => setPw({ ...pw, cur: e.target.value })} error={pwErr.cur} />
          <PasswordField id="next" label="New password" autoComplete="new-password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} error={pwErr.next} />
          <PasswordField id="confirm" label="Confirm new password" autoComplete="new-password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} error={pwErr.confirm} />
          <SubmitButton>Update password</SubmitButton>
        </form>
      </section>

      <button onClick={() => { logout(); navigate('/login') }} className="w-full rounded-lg border border-slate-300 bg-white py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Logout</button>
    </div>
  )
}
