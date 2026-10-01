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
