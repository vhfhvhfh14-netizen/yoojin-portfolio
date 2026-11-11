import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { findBySlug } from '@/lib/payload'
import { getProjectSlugs } from '@/lib/projects'

function getImage(media: unknown) {
  if (!media || typeof media !== 'object' || !('url' in media)) return null
  const value = media as { url?: string | null; alt?: string | null; width?: number | null; height?: number | null }
  if (!value.url || !value.width || !value.height) return null
  return { url: value.url, alt: value.alt ?? '', width: value.width, height: value.height }
}

export default async function ProjectPage({ params }: PageProps<'/projects/[slug]'>) {
  const { slug } = await params
  const project = await findBySlug('projects', slug)
  if (!project) notFound()
  const image = getImage(project.thumbnail)
  return (
    <main className="min-h-screen bg-[#f7f6f2] px-6 py-8 text-[#20201e] md:px-12">
      <div className="mx-auto max-w-[1200px]">
        <Link className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500 hover:text-zinc-900" href="/#work">← All projects</Link>
        <header className="grid gap-8 py-16 md:grid-cols-[1fr_280px] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ee5a35]">{project.projectType?.replace('-', ' ')}</p>
            <h1 className="mt-4 font-display text-6xl leading-[0.9] tracking-[-0.07em] md:text-8xl">{project.title}</h1>
          </div>
          <dl className="grid gap-4 text-sm text-zinc-600">
            <div><dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">Period</dt><dd className="mt-1">{project.period ?? '—'}</dd></div>
            <div><dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">Contribution</dt><dd className="mt-1">{project.contribution ?? '—'}</dd></div>
          </dl>
        </header>
        {image && <Image alt={image.alt} className="aspect-[16/9] w-full object-cover" height={image.height} priority src={image.url} width={image.width} />}
        <div className="grid gap-12 py-20 md:grid-cols-[0.7fr_1.3fr]">
          <p className="text-xs font-semibold uppercase tracking-[0.14em]">Overview</p>
          <div className="space-y-12">
            <p className="font-display text-3xl leading-tight tracking-[-0.04em] md:text-4xl">{project.summary}</p>
            {[['Challenge', project.challenge], ['Approach', project.approach], ['Outcome', project.outcome]].map(([label, copy]) => copy ? (
              <section key={label as string}><h2 className="text-xs font-semibold uppercase tracking-[0.14em]">{label}</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">{copy}</p></section>
            ) : null)}
          </div>
        </div>
        {project.caseStudy?.length ? (
          <section className="border-t border-zinc-900/15 py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.14em]">Case study</p>
            <div className="mt-12 divide-y divide-zinc-900/15">
              {project.caseStudy.map((section) => (
                <article className="grid gap-5 py-9 md:grid-cols-[220px_1fr]" key={section.id}>
                  <div>{section.eyebrow && <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#ee5a35]">{section.eyebrow}</p>}</div>
                  <div>
                    <h2 className="font-display text-3xl tracking-[-0.045em]">{section.heading}</h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600">{section.body}</p>
                    {section.highlight && <p className="mt-5 border-l-2 border-[#ee5a35] pl-4 text-sm font-medium leading-6">{section.highlight}</p>}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}
