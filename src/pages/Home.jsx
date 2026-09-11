import { Link } from 'react-router-dom'
import {
  Landmark,
  Search,
  CalendarDays,
  BrainCircuit,
  ShieldCheck,
  Users,
  ArrowRight,
  Mail,
  Globe,
  MessageCircle,
} from 'lucide-react'

const features = [
  { icon: CalendarDays, title: 'Real-time Availability', desc: 'See live slot updates and book instantly.' },
  { icon: BrainCircuit, title: 'AI-Powered Matching', desc: 'Find the best venue for your needs.' },
  { icon: ShieldCheck, title: 'Secure & Trusted', desc: 'Verified venues and safe bookings.' },
  { icon: Users, title: 'For a Better Campus Experience', desc: 'Making campus events simpler, smarter.' },
]

const venues = [
  { id: 1, tag: 'Outdoor', name: 'Amphitheater', capacity: '300+', desc: 'Perfect for open-air events, cultural fests and performances.' },
  { id: 2, tag: 'Indoor', name: 'NSB Seminar Hall', capacity: '150', desc: 'Ideal for seminars, workshops and guest lectures.' },
  { id: 3, tag: 'Indoor', name: 'New Auditorium', capacity: '500+', desc: 'Large indoor auditorium for major events and fests.' },
  { id: 4, tag: 'Outdoor', name: 'Central Lawn', capacity: '500+', desc: 'Great for college fests, food stalls, exhibitions and more.' },
]

export default function Home() {
  return (
    <div className="bg-[#fdf6f2]">

      {/* ---------- NAVBAR ---------- */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white">
        <div className="flex items-center gap-2">
          <Landmark className="text-red-800" size={26} />
          <h1 className="text-xl font-bold">
            <span className="text-gray-900">Venue</span>
            <span className="text-red-800">Vault</span>
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="/" className="text-red-800 border-b-2 border-red-800 pb-1">Home</Link>
          <Link to="/venues" className="hover:text-red-800">Venues</Link>
          <Link to="/about" className="hover:text-red-800">About</Link>
          <Link to="/contact" className="hover:text-red-800">Contact</Link>
          <Link to="/help" className="hover:text-red-800">Help</Link>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-gray-500">
            <Search size={20} />
          </button>
          <Link to="/login" className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50">
            Login
          </Link>
          <Link to="/register" className="px-4 py-2 bg-red-800 text-white rounded-full text-sm font-medium hover:bg-red-900">
            Register
          </Link>
        </div>
      </nav>

      {/* ---------- HERO SECTION ---------- */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 gap-10">
        <div className="max-w-lg">
          <p className="text-red-800 font-semibold tracking-widest text-sm mb-2">
            — YOUR CAMPUS. YOUR EVENTS.
          </p>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Book Campus <br />
            Venues, <br />
            <span className="text-red-800 italic">Instantly</span>
          </h1>
          <p className="text-gray-500 mt-5">
            From fests to club meetings, find and book the perfect venue for your event — all in one place.
          </p>
          <button className="mt-6 flex items-center gap-2 bg-red-800 text-white px-6 py-3 rounded-full font-medium hover:bg-red-900">
            Get Started <ArrowRight size={18} />
          </button>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600"
            alt="Campus building"
            className="w-full h-80 object-cover"
          />
        </div>
      </section>

      {/* ---------- FEATURES SECTION ---------- */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 px-8 py-10 bg-white">
        {features.map((f, i) => {
          const Icon = f.icon
          return (
            <div key={i} className="text-center md:text-left">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-50 mb-3 mx-auto md:mx-0">
                <Icon className="text-red-800" size={22} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          )
        })}
      </section>

      {/* ---------- POPULAR VENUES SECTION ---------- */}
      <section className="px-8 py-14">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-3xl font-bold text-gray-900">Popular Venues</h2>
          <a href="/venues" className="flex items-center gap-1 text-red-800 font-medium text-sm">
            View All Venues <ArrowRight size={16} />
          </a>
        </div>
        <p className="text-gray-500 mb-8">Explore some of the most booked venues on campus.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {venues.map((v) => (
            <div key={v.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative">
                <img
                  src={`https://source.unsplash.com/random/400x300?venue,${v.id}`}
                  alt={v.name}
                  className="w-full h-40 object-cover"
                />
                <span className="absolute top-2 left-2 bg-white text-xs px-2 py-1 rounded-full font-medium">
                  {v.tag}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900">{v.name}</h3>
                <p className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                  <Users size={14} /> Capacity: {v.capacity}
                </p>
                <p className="text-gray-500 text-sm mb-4">{v.desc}</p>
                <button className="w-full flex items-center justify-center gap-2 bg-red-800 text-white py-2 rounded-full text-sm font-medium hover:bg-red-900">
                  Check Availability <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="bg-gray-900 text-white px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-gray-700">
          <div>
            <h2 className="text-lg font-bold">
              <span>Venue</span><span className="text-red-500">Vault</span>
            </h2>
            <p className="text-gray-400 text-sm italic mt-1">Better Venues. Greater Moments.</p>
          </div>

          <div className="flex gap-6 mt-4 md:mt-0 text-gray-300 text-sm">
            <a href="/">Home</a>
            <a href="/venues">Venues</a>
            <a href="/about">About</a>
            <a href="/contact">Help</a>
          </div>

          <div className="flex gap-4 mt-4 md:mt-0 text-gray-300">
            <Mail size={18} />
            <Globe size={18} />
            <MessageCircle size={18} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between text-gray-500 text-xs mt-4">
          <p>© 2026 VenueVault. All rights reserved.</p>
          <p className="italic">Making campus events effortless</p>
        </div>
      </footer>

    </div>
  )
}