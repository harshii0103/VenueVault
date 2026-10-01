// Demo data only. The backend team replaces these with API calls (see src/services).
const addDays = (n) => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + n); return d }

export const currentUser = { name: 'Harshita', email: 'harshita@college.edu', role: 'applicant' }

// Most recent request first. status: pending | approved | rejected | draft
export const bookings = [
  { id: 'VN-2026-0103', venue: 'Seminar Hall', event: 'Coding Workshop', date: addDays(11), time: '2:00 – 4:00 PM', audience: 120, status: 'pending' },
  { id: 'VN-2026-0102', venue: 'Auditorium', event: 'Cultural Night', date: addDays(20), time: '5:00 – 8:00 PM', audience: 300, status: 'pending' },
  { id: 'VN-2026-0101', venue: 'Conference Room', event: 'Placement Orientation', date: addDays(6), time: '10:00 AM – 12:00 PM', audience: 40, status: 'approved' },
  { id: 'VN-2026-0100', venue: 'Amphitheater', event: 'Freshers Welcome', date: addDays(3), time: '3:00 – 6:00 PM', audience: 450, status: 'approved' },
  { id: 'VN-2026-0099', venue: 'NSB Seminar Hall', event: 'Guest Lecture: AI in Healthcare', date: addDays(27), time: '11:00 AM – 1:00 PM', audience: 100, status: 'approved' },
  { id: 'VN-2026-0098', venue: 'New Auditorium', event: 'Annual Day Rehearsal', date: addDays(34), time: '1:00 – 3:00 PM', audience: 200, status: 'approved' },
  { id: 'VN-2026-0097', venue: 'Seminar Hall', event: 'Debate Finals', date: addDays(41), time: '2:00 – 4:00 PM', audience: 90, status: 'approved' },
  { id: 'VN-2026-0096', venue: 'Auditorium', event: 'Music Society Jam', date: addDays(14), time: '6:00 – 8:00 PM', audience: 350, status: 'rejected' },
  { id: 'VN-2026-0090', venue: 'Auditorium', event: 'Orientation Day', date: addDays(-60), time: '1:00 – 2:00 PM', audience: 100, status: 'approved' },
]

export const isPast = (b) => b.date < addDays(0)
export const formatDate = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

// ---------- Step 2: venues, time helpers, conflict logic ----------
const IMG = (id) => `https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=800`
export const venues = [
  { id: 'amphi', name: 'Amphitheater', type: 'Open air', capacity: 500, amenities: ['Stage', 'Sound system'], image: IMG('photo-1763734281829-c4ec4b855998'), status: 'active' },
  { id: 'newaud', name: 'New Auditorium', type: 'Auditorium', capacity: 350, amenities: ['AC', 'Projector', 'Mic', 'Stage'], image: IMG('photo-1632012773667-b68d7bd59cc4'), status: 'active' },
  { id: 'aud', name: 'Auditorium', type: 'Auditorium', capacity: 300, amenities: ['AC', 'Mic', 'Stage'], image: null, status: 'active' },
  { id: 'seminar', name: 'Seminar Hall', type: 'Seminar hall', capacity: 150, amenities: ['AC', 'Projector', 'Mic'], image: null, status: 'active' },
  { id: 'nsb', name: 'NSB Seminar Hall', type: 'Seminar hall', capacity: 120, amenities: ['AC', 'Projector', 'Board'], image: IMG('photo-1606761568499-6d2451b23c66'), status: 'active' },
  { id: 'conf', name: 'Conference Room', type: 'Conference room', capacity: 40, amenities: ['AC', 'Projector', 'Board'], image: null, status: 'active' },
]
export const venueTypes = ['Auditorium', 'Seminar hall', 'Conference room', 'Open air']
export const getVenue = (id) => venues.find((v) => v.id === id)

// Attach venue + numeric start/end hours to the Step 1 bookings
const meta = { 'VN-2026-0103': ['seminar', 14, 16], 'VN-2026-0102': ['aud', 17, 20], 'VN-2026-0101': ['conf', 10, 12], 'VN-2026-0100': ['amphi', 15, 18], 'VN-2026-0099': ['nsb', 11, 13], 'VN-2026-0098': ['newaud', 13, 15], 'VN-2026-0097': ['seminar', 14, 16], 'VN-2026-0096': ['aud', 18, 20], 'VN-2026-0090': ['aud', 13, 14] }
bookings.forEach((b) => { const [venueId, start, end] = meta[b.id]; Object.assign(b, { venueId, start, end }) })

// Slots already taken by other people (so conflicts can be demonstrated)
const blocked = [
  { venueId: 'newaud', date: addDays(11), start: 13, end: 17 },
  { venueId: 'conf', date: addDays(11), start: 14, end: 15.5 },
  { venueId: 'nsb', date: addDays(5), start: 10, end: 13 },
]

export const toISO = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
export const fromISO = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d) }
export const todayISO = () => toISO(addDays(0))
export const tomorrowISO = () => toISO(addDays(1))

export const fmtTime = (h) => { const hr = Math.floor(h), m = h % 1 ? '30' : '00'; return `${((hr + 11) % 12) + 1}:${m} ${hr < 12 ? 'AM' : 'PM'}` }
export const fmtRange = (s, e) => `${fmtTime(s)} – ${fmtTime(e)}`
export const timeOptions = Array.from({ length: 27 }, (_, i) => ({ value: 8 + i * 0.5, label: fmtTime(8 + i * 0.5) }))

// q = { venueId, date (ISO), start, end }
export function findConflict({ venueId, date, start, end }) {
  const taken = [...bookings.filter((b) => ['pending', 'approved'].includes(b.status)), ...blocked]
  return taken.find((b) => b.venueId === venueId && toISO(b.date) === date && b.start < end && start < b.end)
}

export function suggestAlternatives(q, audience = 0) {
  return venues
    .filter((v) => v.id !== q.venueId && v.status === 'active' && v.capacity >= audience && !findConflict({ ...q, venueId: v.id }))
    .sort((a, b) => a.capacity - b.capacity)
    .slice(0, 3)
}

// TODO (AI/backend): replace with the real recommendation model. Ideal hall is ~85% full.
export function matchScore(v, audience) {
  if (!audience) return null
  return Math.round(Math.max(55, 100 - Math.abs(0.85 - audience / v.capacity) * 60))
}

export function addBooking(b) {
  const n = Math.max(...bookings.map((x) => parseInt(x.id.slice(-4), 10))) + 1
  const booking = { id: `VN-2026-${String(n).padStart(4, '0')}`, ...b }
  bookings.unshift(booking)
  return booking
}
