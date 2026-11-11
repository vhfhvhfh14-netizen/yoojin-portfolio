import Link from 'next/link'
import { ProjectGrid } from '@/components/ProjectGrid'
import { getProjects } from '@/lib/projects'

export default async function HomePage() {
  const projects = await getProjects()

  return (
    <main className="overflow-hidden bg-[#f7f6f2] text-[#20201e]">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <Link className="font-display text-xl font-semibold tracking-[-0.06em]" href="/">ji.yoon</Link>
        <div className="hidden gap-8 text-xs font-medium uppercase tracking-[0.12em] md:flex"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></div>
        <a className="text-xs font-medium uppercase tracking-[0.12em]" href="#contact">Let&apos;s talk →</a>
      </nav>
      <section className="mx-auto max-w-[1440px] px-6 pb-20 pt-18 md:px-12 md:pb-32 md:pt-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_250px] lg:items-end">
          <h1 className="max-w-5xl font-display text-[clamp(4.1rem,10.1vw,9.2rem)] font-medium leading-[0.82] tracking-[-0.085em]">UX/UI experiences<br />with <span className="text-[#ee5a35]">clarity.</span></h1>
          <p className="max-w-[250px] text-sm leading-relaxed text-zinc-600">사용자의 문제를 이해하고, 더 쉽고 자연스러운 디지털 경험을 설계합니다.</p>
        </div>
      </section>
      <section className="border-t border-zinc-900/15" id="work">
        <div className="mx-auto max-w-[1440px] px-6 py-7 md:px-12"><p className="text-xs font-medium uppercase tracking-[0.14em]">Selected projects</p></div>
        <div className="mx-auto max-w-[1440px] px-6 pb-24 md:px-12 md:pb-36"><ProjectGrid projects={projects} /></div>
      </section>
      <section className="bg-[#e5e2da] px-6 py-24 md:px-12 md:py-32" id="about"><div className="mx-auto grid max-w-[1440px] gap-14 md:grid-cols-[0.9fr_1.1fr]"><p className="text-xs font-medium uppercase tracking-[0.14em]">About</p><p className="font-display text-4xl leading-[0.98] tracking-[-0.055em] md:text-6xl">복잡한 제품의 흐름을 단순하게 만들고, 사용자가 믿고 머무를 수 있는 인터페이스를 디자인합니다.</p></div></section>
      <section className="bg-[#ee5a35] px-6 py-24 text-[#211f1c] md:px-12 md:py-32" id="contact"><div className="mx-auto max-w-[1440px]"><p className="text-xs font-semibold uppercase tracking-[0.14em]">Get in touch</p><a className="mt-10 block w-fit font-display text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.88] tracking-[-0.08em] underline underline-offset-8" href="mailto:hello@jiyoon.design">hello@jiyoon.design</a></div></section>
    </main>
  )
}
