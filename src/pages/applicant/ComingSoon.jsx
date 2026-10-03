import { Link } from 'react-router-dom'
import { EmptyState } from '../../components/ui'

export default function ComingSoon({ title }) {
  return (
    <EmptyState title={title} text="This page is being built next." action={<Link to="/dashboard" className="text-sm font-semibold text-[#9f263d] hover:underline">← Back to dashboard</Link>} />
  )
}
