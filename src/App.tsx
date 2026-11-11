import { useState } from 'react'

const projects = [
  {
    title: 'Norrøna House',
    type: 'Brand identity · Web design',
    category: 'Branding',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbmVyJTIwc3R1ZGlvJTIwZGVzayUyMGVkaXRvcmlhbHxlbnwxfHx8fDE3OTQ0MDMwOTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tone: 'bg-[#d7c7bc]',
  },
  {
    title: 'Mori Journal',
    type: 'Digital product · Editorial',
    category: 'Digital',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjcmVhdGl2ZSUyMGRlc2lnbmVyJTIwc3R1ZGlvJTIwZGVzayUyMGVkaXRvcmlhbHxlbnwxfHx8fDE3OTQ0MDMwOTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tone: 'bg-[#d1d6c7]',
  },
  {
    title: 'Pace Athletics',
    type: 'Campaign · Art direction',
    category: 'Campaign',
    year: '2023',
    image:
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjcmVhdGl2ZSUyMGRlc2lnbmVyJTIwc3R1ZGlvJTIwZGVzayUyMGVkaXRvcmlhbHxlbnwxfHx8fDE3OTQ0MDMwOTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tone: 'bg-[#b9c7c8]',
  },
  {
    title: 'Sora Objects',
    type: 'E-commerce · Digital experience',
    category: 'Digital',
    year: '2023',
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbmVyJTIwc3R1ZGlvJTIwZGVzayUyMGVkaXRvcmlhbHxlbnwxfHx8fDE3OTQ0MDMwOTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tone: 'bg-[#e1bcb7]',
  },
]

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
    <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

export default function App() {
  const [filter, setFilter] = useState('All work')
  const filters = ['All work', 'Branding', 'Digital', 'Campaign']
  const shownProjects = filter === 'All work' ? projects : projects.filter((project) => project.category === filter)

  return (
    <main className="overflow-hidden bg-[#f7f6f2] text-[#20201e]">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <a href="#" className="font-display text-xl font-semibold tracking-[-0.06em]">ji.yoon</a>
        <div className="hidden gap-8 text-xs font-medium uppercase tracking-[0.12em] md:flex">
          <a href="#work" className="link-underline">Work</a>
          <a href="#about" className="link-underline">About</a>
          <a href="#contact" className="link-underline">Contact</a>
        </div>
        <a href="#contact" className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em]">
          Let&apos;s talk <Arrow />
        </a>
      </nav>

      <section className="mx-auto max-w-[1440px] px-6 pb-20 pt-18 md:px-12 md:pb-32 md:pt-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_250px] lg:items-end">
          <h1 className="max-w-5xl font-display text-[clamp(4.1rem,10.1vw,9.2rem)] font-medium leading-[0.82] tracking-[-0.085em]">
            Digital experiences
            <br />
            with <span className="text-[#ee5a35]">warmth.</span>
          </h1>
          <p className="max-w-[250px] text-sm leading-relaxed text-[#5e5c57]">
            Independent designer focused on identities and digital spaces that people want to return to.
          </p>
        </div>
        <div className="mt-14 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#66635e] md:mt-24">
          <span className="h-2 w-2 rounded-full bg-[#ee5a35]" /> Currently available for selected projects
        </div>
      </section>

      <section id="work" className="border-t border-[#20201e]/15">
        <div className="mx-auto max-w-[1440px] px-6 py-7 md:px-12">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <p className="text-xs font-medium uppercase tracking-[0.14em]">Selected work · 2021—24</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {filters.map((item) => (
                <button key={item} onClick={() => setFilter(item)} className={`text-xs transition ${filter === item ? 'border-b border-[#20201e] pb-1 font-semibold' : 'text-[#74716a] hover:text-[#20201e]'}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto grid max-w-[1440px] gap-x-5 gap-y-12 px-6 pb-24 md:grid-cols-2 md:px-12 md:pb-36">
          {shownProjects.map((project, index) => (
            <article key={project.title} className={index % 2 ? 'md:mt-28' : ''}>
              <a href="#contact" className={`group block overflow-hidden ${project.tone}`}>
                <img src={project.image} alt={`${project.title} project preview`} className="aspect-[1.12/1] w-full object-cover transition duration-700 group-hover:scale-[1.035]" />
              </a>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl tracking-[-0.05em]">{project.title}</h2>
                  <p className="mt-1 text-xs text-[#65625d]">{project.type}</p>
                </div>
                <span className="pt-1 text-xs text-[#65625d]">{project.year}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="bg-[#e5e2da]">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-24 md:grid-cols-[0.9fr_1.1fr] md:px-12 md:py-36">
          <p className="text-xs font-medium uppercase tracking-[0.14em]">01 — A little about me</p>
          <div>
            <p className="font-display text-4xl leading-[0.98] tracking-[-0.055em] md:text-6xl">
              I turn good ideas into clear, expressive visual systems — working across strategy, identity and interface.
            </p>
            <div className="mt-12 grid gap-8 text-sm leading-relaxed text-[#5c5a54] sm:grid-cols-2">
              <p>Based in Seoul, collaborating with thoughtful teams everywhere. I value curiosity, candor and a process with room to play.</p>
              <p>Previously at Studio FNT and currently independent. When away from a screen, I&apos;m usually making ceramics or collecting books.</p>
            </div>
            <a href="#contact" className="mt-12 inline-flex items-center gap-3 border-b border-[#20201e] pb-2 text-xs font-semibold uppercase tracking-[0.12em]">More about me <Arrow /></a>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#ee5a35] px-6 py-24 text-[#211f1c] md:px-12 md:py-36">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-xs font-semibold uppercase tracking-[0.14em]">02 — Get in touch</p>
          <a href="mailto:hello@jiyoon.design" className="mt-12 block w-fit font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.88] tracking-[-0.08em] underline decoration-1 underline-offset-8 transition-opacity hover:opacity-70">
            hello@jiyoon.design
          </a>
          <footer className="mt-24 flex flex-col gap-5 border-t border-[#211f1c]/30 pt-5 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p>© 2024 Ji Yoon. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#contact" className="link-underline">Instagram</a>
              <a href="#contact" className="link-underline">LinkedIn</a>
              <a href="#" className="link-underline">Back to top</a>
            </div>
          </footer>
        </div>
      </section>
    </main>
  )
}
