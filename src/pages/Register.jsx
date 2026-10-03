import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthLayout, TextField, PasswordField, Segmented, Field, inputCls, Banner, SubmitButton } from '../components/auth'

// Set e.g. 'yourcollege.edu' to accept only college emails. Empty = any email.
const COLLEGE_EMAIL_DOMAIN = ''

// TODO: replace with your real API call. Role is always "applicant" – never send admin from this form.
async function registerUser() {
  await new Promise((r) => setTimeout(r, 800))
  return { ok: true }
}

const rules = [
  ['At least 8 characters', (p) => p.length >= 8],
  ['One uppercase letter', (p) => /[A-Z]/.test(p)],
  ['One number', (p) => /\d/.test(p)],
]

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', collegeId: '', type: 'student', dept: '', phone: '', password: '', confirm: '', terms: false })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ loading: false, error: '', success: false })
  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
    setErrors((er) => ({ ...er, [k]: undefined })) // clear this field's error as soon as the user edits it
  }

  const validate = () => {
    const e = {}
    if (form.name.trim().length < 2) e.name = 'Enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address.'
    else if (COLLEGE_EMAIL_DOMAIN && !form.email.toLowerCase().endsWith('@' + COLLEGE_EMAIL_DOMAIN)) e.email = `Use your @${COLLEGE_EMAIL_DOMAIN} email.`
    if (!form.collegeId.trim()) e.collegeId = 'Enter your college / employee ID.'
    if (!form.dept.trim()) e.dept = 'Enter your department or society.'
    if (form.phone && !/^\+?\d{10,13}$/.test(form.phone.replace(/[\s-]/g, ''))) e.phone = 'Enter a valid phone number.'
    if (!rules.every(([, ok]) => ok(form.password))) e.password = 'Password does not meet the requirements.'
    if (form.confirm !== form.password) e.confirm = 'Passwords do not match.'
    if (!form.terms) e.terms = 'Please accept the venue booking policies.'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    setStatus({ loading: true, error: '', success: false })
    try {
      const res = await registerUser({ ...form, role: 'applicant' })
      if (!res.ok) throw new Error(res.message || 'Could not create account.')
      setStatus({ loading: false, error: '', success: true })
    } catch (err) {
      setStatus({ loading: false, error: err.message || 'Something went wrong. Please try again.', success: false })
    }
  }

  return (
    <AuthLayout
      title="Create account"
      subtitle="For students, faculty and staff"
      footer={<p className="mt-6 text-center text-sm text-slate-500">Already have an account? <Link to="/login" className="font-semibold text-[#9f263d] hover:underline">Login</Link></p>}
    >
      {status.success ? (
        <Banner type="success">Account created. <Link to="/login" className="font-semibold underline">Go to login</Link></Banner>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {status.error && <Banner>{status.error}</Banner>}
          <TextField id="name" label="Full name" placeholder="Enter your full name" autoComplete="name" value={form.name} onChange={set('name')} error={errors.name} />
          <TextField id="email" type="email" label="College email" placeholder="you@college.edu" autoComplete="email" value={form.email} onChange={set('email')} error={errors.email} />
          <TextField id="collegeId" label="College / Employee ID" placeholder="Used to log in" value={form.collegeId} onChange={set('collegeId')} error={errors.collegeId} />
          <Field id="type" label="I am a">
            <Segmented label="Account type" value={form.type} onChange={(v) => setForm({ ...form, type: v })} options={[['student', 'Student'], ['faculty', 'Faculty'], ['staff', 'Staff']]} />
          </Field>
          <TextField id="dept" label="Department / Society" placeholder="e.g. Computer Science, Drama Society" value={form.dept} onChange={set('dept')} error={errors.dept} />
          <TextField id="phone" type="tel" label="Phone" optional placeholder="For booking notifications" autoComplete="tel" value={form.phone} onChange={set('phone')} error={errors.phone} />
          <div>
            <PasswordField id="password" label="Password" placeholder="Create a password" autoComplete="new-password" value={form.password} onChange={set('password')} error={errors.password} />
            <ul className="mt-2 space-y-1 text-xs">
              {rules.map(([text, ok]) => (
                <li key={text} className={ok(form.password) ? 'text-emerald-600' : 'text-slate-500'}>{ok(form.password) ? '✓' : '○'} {text}</li>
              ))}
            </ul>
          </div>
          <PasswordField id="confirm" label="Confirm password" placeholder="Re-enter your password" autoComplete="new-password" value={form.confirm} onChange={set('confirm')} error={errors.confirm} />
          <div>
            <label className="flex items-start gap-2 text-sm text-slate-600">
              <input type="checkbox" checked={form.terms} onChange={set('terms')} className="mt-0.5 rounded border-slate-300 text-[#9f263d] focus:ring-[#9f263d]" />
              I agree to the venue booking policies and privacy terms.
            </label>
            {errors.terms && <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">{errors.terms}</p>}
          </div>
          <SubmitButton loading={status.loading}>{status.loading ? 'Creating account…' : 'Create account'}</SubmitButton>
          <p className="text-center text-xs text-slate-500">Need admin access? Admin accounts are created by the campus administration.</p>
        </form>
      )}
    </AuthLayout>
  )
}
