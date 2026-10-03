import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { currentUser } from '../data/mockData'
import { AuthLayout, TextField, PasswordField, Segmented, Banner, SubmitButton } from '../components/auth'

// TODO: replace with your real API call (return { ok, message }).
async function authenticate() {
  await new Promise((r) => setTimeout(r, 700))
  return { ok: true }
}

export default function Login() {
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const { login } = useAuth()
  const portal = params.get('portal') === 'admin' ? 'admin' : 'student'
  const [form, setForm] = useState({ identifier: '', password: '', remember: false })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ loading: false, error: '', success: false })

  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
    setErrors((er) => ({ ...er, [k]: undefined })) // clear this field's error as soon as the user edits it
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const next = {}
    if (!form.identifier.trim()) next.identifier = 'Enter your email or college ID.'
    if (!form.password) next.password = 'Enter your password.'
    setErrors(next)
    if (Object.keys(next).length) return

    setStatus({ loading: true, error: '', success: false })
    try {
      const res = await authenticate({ ...form, portal })
      if (!res.ok) throw new Error(res.message || 'Incorrect email/ID or password.')
      // TODO (backend): use the real user/token from the API response instead of currentUser.
      if (portal === 'student') { login(currentUser); navigate('/dashboard'); return }
      setStatus({ loading: false, error: '', success: true }) // admin dashboard comes in a later step
    } catch (err) {
      setStatus({ loading: false, error: err.message || 'Something went wrong. Please try again.', success: false })
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle={portal === 'admin' ? 'Admin portal · manage venues and approvals' : 'Book and track campus venues'}
      footer={
        <p className="mt-6 text-center text-sm text-slate-500">
          {portal === 'admin' ? (
            'Admin accounts are created by the campus administration.'
          ) : (
            <>New user? <Link to="/register" className="font-semibold text-[#9f263d] hover:underline">Create account</Link></>
          )}
        </p>
      }
    >
      <Segmented
        label="Portal"
        value={portal}
        onChange={(v) => setParams(v === 'admin' ? { portal: 'admin' } : {}, { replace: true })}
        options={[['student', 'Student / Faculty'], ['admin', 'Admin']]}
      />
      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        {status.error && <Banner>{status.error}</Banner>}
        {status.success && <Banner type="success">Signed in successfully. Redirecting…</Banner>}
        <TextField id="identifier" label="Email / College ID" placeholder="Enter your email or college ID" autoComplete="username" value={form.identifier} onChange={set('identifier')} error={errors.identifier} />
        <PasswordField id="password" label="Password" placeholder="Enter your password" autoComplete="current-password" value={form.password} onChange={set('password')} error={errors.password} />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600">
            <input type="checkbox" checked={form.remember} onChange={set('remember')} className="rounded border-slate-300 text-[#9f263d] focus:ring-[#9f263d]" />
            Remember me
          </label>
          <Link to="/forgot-password" className="font-semibold text-[#9f263d] hover:underline">Forgot password?</Link>
        </div>
        <SubmitButton loading={status.loading}>{status.loading ? 'Signing in…' : 'Login'}</SubmitButton>
      </form>
    </AuthLayout>
  )
}