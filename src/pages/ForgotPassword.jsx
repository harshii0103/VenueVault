import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthLayout, TextField, Banner, SubmitButton } from '../components/auth'

// TODO (backend): send a password-reset link to the account's registered email.
async function requestReset() {
  await new Promise((r) => setTimeout(r, 700))
  return { ok: true }
}

export default function ForgotPassword() {
  const [identifier, setIdentifier] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState({ loading: false, sent: false, error: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!identifier.trim()) return setError('Enter your email or college ID.')
    setError('')
    setStatus({ loading: true, sent: false, error: '' })
    try {
      const res = await requestReset({ identifier })
      if (!res.ok) throw new Error(res.message)
      setStatus({ loading: false, sent: true, error: '' })
    } catch (err) {
      setStatus({ loading: false, sent: false, error: err.message || 'Something went wrong. Please try again.' })
    }
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="We'll email you a link to set a new one"
      footer={<p className="mt-6 text-center text-sm text-slate-500">Remembered it? <Link to="/login" className="font-semibold text-[#9f263d] hover:underline">Back to login</Link></p>}
    >
      {status.sent ? (
        // Same message whether or not the account exists, so the form can't be used to check who is registered.
        <Banner type="success">If an account exists for that email or ID, a reset link has been sent. Check your inbox.</Banner>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {status.error && <Banner>{status.error}</Banner>}
          <TextField id="identifier" label="Email / College ID" placeholder="Enter your email or college ID" autoComplete="username" value={identifier} onChange={(e) => setIdentifier(e.target.value)} error={error} />
          <SubmitButton loading={status.loading}>{status.loading ? 'Sending…' : 'Send reset link'}</SubmitButton>
        </form>
      )}
    </AuthLayout>
  )
}