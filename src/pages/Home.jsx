import { Link } from "react-router-dom";

const paths = {
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  building: <><path d="M3 21h18" /><path d="M6 21V8l6-4 6 4v13" /><path d="M9 12h.01M15 12h.01M9 16h.01M15 16h.01" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /><path d="m9 16 2 2 4-5" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  facebook: <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1Z" />,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
  linkedin: <><path d="M6 9v12M6 5v.01M10 21v-7a4 4 0 0 1 8 0v7M10 9v12" /></>,
  login: <><path d="M14 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-3" /><path d="M9 12h12m-4-4 4 4-4 4" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  map: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2" /></>,
  paper: <><path d="M6 2h9l4 4v16H6z" /><path d="M14 2v5h5M9 13l2 2 4-4" /></>,
  people: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
  spark: <><path d="m12 3-1.4 4.1a5 5 0 0 1-3.1 3.1L3 12l4.5 1.8a5 5 0 0 1 3.1 3.1L12 21l1.4-4.1a5 5 0 0 1 3.1-3.1L21 12l-4.5-1.8a5 5 0 0 1-3.1-3.1Z" /></>,
  twitter: <path d="M22 5.9c-.7.3-1.5.5-2.3.6a4 4 0 0 0-7 2.7v.9a11.4 11.4 0 0 1-8.3-4.2S.8 14 8.5 17.4A11.5 11.5 0 0 1 2 19.2c7.7 4.3 17.1 0 17.1-10 0-.2 0-.4-.1-.6.8-.8 1.5-1.6 2-2.7Z" />,
  zap: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
};

function Icon({ name, className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Logo({ light = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="VenueVault home">
      <span className={`grid h-9 w-9 place-items-center rounded-xl ${light ? "bg-white/10 text-white" : "bg-[#121f3f] text-white"}`}>
        <Icon name="building" className="h-5 w-5" />
      </span>
      <span className={`font-display text-xl font-bold tracking-[-0.03em] ${light ? "text-white" : "text-[#101c38]"}`}>
        Venue<span className="text-[#9f263d]">Vault</span>
      </span>
    </Link>
  );
}

const venues = [
  {
    name: "Amphitheater",
    capacity: "500 seats",
    image: "https://images.unsplash.com/photo-1763734281829-c4ec4b855998?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
    alt: "Open-air stone amphitheater surrounded by trees",
  },
  {
    name: "NSB Seminar Hall",
    capacity: "120 seats",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
    alt: "Modern university lecture hall",
  },
  {
    name: "New Auditorium",
    capacity: "350 seats",
    image: "https://images.unsplash.com/photo-1632012773667-b68d7bd59cc4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
    alt: "Large auditorium with rows of red seats",
  },
];

const features = [
  {
    icon: "calendar",
    label: "LIVE AVAILABILITY",
    title: "No conflicts. No guesswork.",
    description: "See every venue's live schedule and catch booking conflicts before they happen.",
  },
  {
    icon: "spark",
    label: "AGENTIC AI",
    title: "Smarter venue decisions.",
    description: "Get tailored recommendations and automate routine approvals with an intelligent campus agent.",
  },
  {
    icon: "zap",
    label: "EDGE COMPUTING",
    title: "Fast, private, dependable.",
    description: "Campus-edge processing keeps every booking fast and reliable while sensitive data stays protected.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f8fa] font-sans text-[#15213d]">
      <header className="absolute inset-x-0 top-0 z-30">
        <nav className="mx-auto flex h-20 max-w-[1180px] items-center justify-between px-5 lg:px-8" aria-label="Main navigation">
          <Logo light />
          <div className="hidden items-center gap-8 md:flex">
            {["Home", "Venues", "About", "Contact"].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                aria-current={index === 0 ? "page" : undefined}
                className={`border-b-2 pb-1 text-sm font-medium transition hover:text-white ${index === 0 ? "border-[#e26278] text-white" : "border-transparent text-slate-300"}`}
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:block">Login</Link>
            <Link to="/register" className="rounded-xl bg-[#a42b43] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/15 transition hover:bg-[#b8334d]">Sign Up</Link>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="relative bg-[#101c38] pb-24 pt-32 text-white lg:pb-28 lg:pt-40">
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -right-24 -top-32 h-[480px] w-[480px] rounded-full bg-[#9f263d]/18 blur-3xl" />
            <div className="hero-grid absolute inset-0 opacity-30" />
          </div>
          <div className="relative mx-auto grid max-w-[1180px] items-center gap-16 px-5 lg:grid-cols-[1.02fr_.98fr] lg:px-8">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.07] px-3.5 py-2 text-xs font-semibold tracking-wide text-slate-200">
                <span className="h-2 w-2 rounded-full bg-[#d9546c] shadow-[0_0_0_4px_rgba(217,84,108,.14)]" />
                SMARTER CAMPUS OPERATIONS
              </div>
              <h1 className="font-display text-[clamp(3rem,6vw,5.4rem)] font-bold leading-[.98] tracking-[-0.055em]">
                Book campus venues <span className="text-[#e26278]">in real time.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                Eliminate double bookings and paperwork with an agentic AI and edge-powered platform built for your campus.
              </p>
              {/* Fix 9 (Major): Student Portal is the single primary CTA (solid button); Admin Portal is
                  now a lightweight text link so the two no longer compete for attention. */}
              <div className="mt-9 flex flex-wrap items-baseline gap-5">
                <Link to="/login" className="group inline-flex items-center gap-2 rounded-xl bg-[#a42b43] px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#b8334d]">
                  Student Portal <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
                <Link to="/login" className="inline-flex items-baseline gap-1.5 text-sm font-semibold text-slate-300 transition hover:text-white">
                  Admin Portal <Icon name="chevron" className="h-3.5 w-3.5 self-center" />
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-3 text-xs text-slate-400">
                <div className="flex -space-x-2">
                  {["bg-[#c98a69]", "bg-[#557e8e]", "bg-[#8f6b88]"].map((color) => <span key={color} className={`h-7 w-7 rounded-full border-2 border-[#101c38] ${color}`} />)}
                </div>
                Trusted by students, faculty, and campus teams
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[550px]">
              {/* Fix 3: rounded-[2rem] merged into the standard rounded-3xl token */}
              <div className="absolute -inset-5 rounded-3xl bg-[#9f263d]/15 blur-2xl" />
              {/* Fix 3: rounded-[1.4rem] merged into the standard rounded-2xl token */}
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#f8fafc] shadow-2xl shadow-black/30">
                <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
                  <div>
                    <p className="text-xs font-bold tracking-[.15em] text-[#9f263d]">VENUEVAULT</p>
                    <p className="mt-0.5 text-sm font-bold text-[#13203e]">Booking overview</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-500"><Icon name="search" className="h-4 w-4" /></span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[#13203e] text-xs font-bold">AD</span>
                  </div>
                </div>
                <div className="grid grid-cols-[64px_1fr] text-[#13203e]">
                  <div className="flex flex-col items-center gap-5 border-r border-slate-200 bg-white py-5 text-slate-400">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#9f263d] text-white"><Icon name="calendar" className="h-4 w-4" /></span>
                    <Icon name="building" className="h-4 w-4" /><Icon name="people" className="h-4 w-4" /><Icon name="paper" className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-base font-bold">May 2025</p>
                        {/* Fix 4: 10px -> text-xs (12px minimum for readable copy) */}
                        <p className="text-xs text-slate-400">Campus venue calendar</p>
                      </div>
                      {/* Fix 11: this control is part of a decorative product-preview mockup, not a
                          live action, so it's rendered as a non-interactive, aria-hidden span rather
                          than a <button> to remove the false affordance. */}
                      <span aria-hidden="true" className="rounded-lg bg-[#9f263d] px-3 py-2 text-xs font-bold text-white">+ New booking</span>
                    </div>
                    <div className="mt-5 grid grid-cols-5 gap-1.5 text-center">
                      {["MON", "TUE", "WED", "THU", "FRI"].map((day) => <span key={day} className="pb-2 text-xs font-bold text-slate-400">{day}</span>)}
                      {[12, 13, 14, 15, 16, 19, 20, 21, 22, 23].map((date) => (
                        <div key={date} className={`relative h-12 rounded-md border pt-2 text-xs font-semibold ${date === 15 ? "border-[#9f263d] bg-[#9f263d] text-white" : "border-slate-200 bg-white text-slate-500"}`}>
                          {date}
                          {[13, 16, 20, 22].includes(date) && <span className={`absolute bottom-2 left-1/2 h-1 w-5 -translate-x-1/2 rounded-full ${date === 16 ? "bg-emerald-400" : "bg-[#d2697d]"}`} />}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2.5">
                      {/* Fix 5 + colour merge: 10px -> text-xs, emerald-800 -> emerald-700 */}
                      <span className="flex items-center gap-2 text-xs font-bold text-emerald-700"><span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white"><Icon name="check" className="h-3 w-3" /></span>No booking conflicts</span>
                      <span className="text-xs text-emerald-600">Live</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Fix 6: "AI RECOMMENDATION" -> sentence case + text-xs, removes the long all-caps run */}
              <div className="absolute -bottom-7 -left-5 hidden items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 text-[#13203e] shadow-xl sm:flex">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#f8e8ec] text-[#9f263d]"><Icon name="spark" className="h-4 w-4" /></span>
                <div><p className="text-xs text-slate-400">AI recommendation</p><p className="text-xs font-bold">NSB Hall is your best match</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-8 max-w-[1180px] px-5 lg:px-8" aria-label="Platform highlights">
          <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["building", "25+", "Campus Venues"],
              ["calendar", "Real-time", "Conflict Detection"],
              ["paper", "Zero", "Paperwork"],
              ["shield", "Edge-powered", "& Secure"],
            ].map(([icon, stat, label], index) => (
              <div key={label} className={`flex items-center gap-4 px-6 py-6 ${index > 0 ? "border-t border-slate-100 sm:border-t-0 sm:border-l" : ""} ${index === 2 ? "sm:border-l-0 lg:border-l" : ""}`}>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#f8e8ec] text-[#9f263d]"><Icon name={icon} /></span>
                <div><p className="font-display text-lg font-bold text-[#13203e]">{stat}</p><p className="text-xs text-slate-500">{label}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="mx-auto max-w-[1180px] px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Built for the modern campus</p>
            <h2 className="section-title mt-3">One platform. Every campus space.</h2>
            <p className="mt-4 text-base leading-7 text-slate-500">From discovery to approval, VenueVault makes each step faster, clearer, and more reliable.</p>
          </div>
          {/* Fix 7: each card is now a full-height flex column with the description set to flex-1,
              so "Learn more" always lands on the same baseline regardless of description length. */}
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {features.map((feature, index) => (
              <article key={feature.title} className="feature-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/[.06]">
                <span className="absolute right-5 top-4 font-display text-4xl font-bold text-slate-100">0{index + 1}</span>
                {/* Fix 8: icon container radius unified with the "four steps" section (rounded-2xl) */}
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-[#13203e] text-white"><Icon name={feature.icon} /></span>
                {/* Fix 4/colour merge: 10px -> text-xs, #a42b43 -> #9f263d (single brand maroon) */}
                <p className="mt-7 text-xs font-bold tracking-[.14em] text-[#9f263d]">{feature.label}</p>
                <h3 className="mt-2 font-display text-xl font-bold tracking-[-0.02em] text-[#13203e]">{feature.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">{feature.description}</p>
                <a href="#" className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#13203e]">Learn more <Icon name="arrow" className="h-4 w-4" /></a>
              </article>
            ))}
          </div>
        </section>

        <section id="venues" className="bg-white py-24 lg:py-28">
          <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
            {/* Fix 10: heading and "View all venues" now share one flex row with items-baseline,
                so the link's baseline aligns exactly with the h2's baseline instead of the
                bottom of the whole (taller) text block. */}
            <div className="flex flex-col gap-5">
              <p className="eyebrow">EXPLORE SPACES</p>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-baseline sm:justify-between">
                <h2 className="section-title">Popular venues</h2>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-[#9f263d]">View all venues <Icon name="arrow" className="h-4 w-4" /></a>
              </div>
              <p className="text-sm text-slate-500">Find the right setting for your next campus event.</p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {venues.map((venue) => (
                <article key={venue.name} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/[.07]">
                  <div className="relative h-56 overflow-hidden bg-slate-200">
                    <img src={venue.image} alt={venue.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-emerald-700 shadow-sm"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />AVAILABLE</span>
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#101c38]/65 to-transparent" />
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <div><h3 className="font-display text-lg font-bold text-[#13203e]">{venue.name}</h3><p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500"><Icon name="people" className="h-3.5 w-3.5" />{venue.capacity}</p></div>
                    <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-[#13203e] transition group-hover:border-[#9f263d] group-hover:bg-[#9f263d] group-hover:text-white"><Icon name="arrow" className="h-4 w-4" /></span>
                  </div>
                  {/* Stretched-link: the whole card is now the real hit target, not just the 40px circle */}
                  <a href="#" aria-label={`View ${venue.name}`} className="absolute inset-0 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9f263d]"></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7f8fa] py-24 lg:py-28">
          <div className="mx-auto max-w-[1060px] px-5 lg:px-8">
            <div className="text-center"><p className="eyebrow">SIMPLE BY DESIGN</p><h2 className="section-title mt-3">From search to event in four steps.</h2></div>
            <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden border-t-2 border-dashed border-slate-300 lg:block" />
              {[
                ["login", "Login", "Access with your campus ID."],
                ["search", "Search venue", "Filter by time, size, and needs."],
                ["calendar", "Book & get notified", "Submit once and track approval."],
                ["check", "Attend event", "Arrive ready. We handle the rest."],
              ].map(([icon, title, description], index) => (
                <div key={title} className="relative text-center">
                  <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-2xl border-4 border-[#f7f8fa] bg-[#13203e] text-white shadow-lg"><Icon name={icon} /></span>
                  <span className="absolute left-[calc(50%+18px)] top-0 grid h-5 w-5 place-items-center rounded-full bg-[#a42b43] text-xs font-bold text-white">{index + 1}</span>
                  <h3 className="mt-5 font-display text-base font-bold text-[#13203e]">{title}</h3>
                  <p className="mx-auto mt-2 max-w-[190px] text-xs leading-5 text-slate-500">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 lg:px-8 lg:pb-28">
          <div className="relative mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-7 overflow-hidden rounded-3xl bg-[#9f263d] px-7 py-12 text-center text-white sm:px-12 lg:flex-row lg:text-left">
            <div className="absolute -right-16 -top-28 h-72 w-72 rounded-full border-[45px] border-white/[.06]" />
            <div className="relative"><p className="text-xs font-bold tracking-[.15em] text-rose-100">READY TO GET STARTED?</p><h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.035em] sm:text-4xl">Your perfect venue is waiting.</h2><p className="mt-3 text-sm text-rose-100">Sign in with your campus account and book in minutes.</p></div>
            {/* Colour merge: #8f2036 -> #9f263d (single brand maroon everywhere) */}
            <Link to="/login" className="relative inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#9f263d] shadow-lg transition hover:-translate-y-0.5">Browse venues <Icon name="arrow" className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>

      {/* Fix 12: footer grid rebalanced so the logo column no longer dwarfs the link columns */}
      <footer id="contact" className="border-t-4 border-[#9f263d] bg-[#0c1730] text-slate-300">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.1fr_.8fr_.8fr_1fr] lg:px-8">
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">Intelligent venue booking for a connected, efficient, and paperless campus.</p>
            <div className="mt-6 flex gap-2.5">
              {["linkedin", "twitter", "instagram", "facebook"].map((icon) => <a key={icon} href="#" aria-label={icon} className="grid h-9 w-9 place-items-center rounded-lg bg-white/[.07] text-slate-300 transition hover:bg-[#9f263d] hover:text-white"><Icon name={icon} className="h-4 w-4" /></a>)}
            </div>
          </div>
          <div><h3 className="text-xs font-bold tracking-[.12em] text-white">QUICK LINKS</h3><div className="mt-5 flex flex-col gap-3 text-sm text-slate-400"><a href="#home">Home</a><a href="#venues">Venues</a><a href="#about">About us</a><a href="#">FAQs</a></div></div>
          <div><h3 className="text-xs font-bold tracking-[.12em] text-white">PLATFORM</h3><div className="mt-5 flex flex-col gap-3 text-sm text-slate-400"><Link to="/login">Student portal</Link><Link to="/login">Admin portal</Link><a href="#">Venue policies</a><a href="#">Support</a></div></div>
          {/* Colour merge: #d5576e -> #e26278 (reuse the hero accent instead of a near-duplicate shade) */}
          <div><h3 className="text-xs font-bold tracking-[.12em] text-white">CONTACT</h3><div className="mt-5 flex flex-col gap-4 text-sm text-slate-400"><p className="flex gap-2.5"><Icon name="map" className="mt-0.5 h-4 w-4 shrink-0 text-[#e26278]" />Campus Administration Block</p><a href="mailto:help@venuevault.edu" className="flex gap-2.5"><Icon name="mail" className="h-4 w-4 shrink-0 text-[#e26278]" />help@venuevault.edu</a></div></div>
        </div>
        <div className="border-t border-white/[.08]">
          {/* Fix 4: 11px -> text-xs */}
          <div className="mx-auto flex max-w-[1180px] flex-col justify-between gap-2 px-5 py-5 text-xs text-slate-500 sm:flex-row lg:px-8"><p>© 2025 VenueVault. All rights reserved.</p><p>Built for a smarter campus.</p></div>
        </div>
      </footer>
    </div>
  );
}