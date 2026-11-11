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
        <div className="border-b border-zinc-900/15 py-20 md:grid md:grid-cols-[220px_1fr] md:gap-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em]">Project overview</p>
          <div className="mt-6 md:mt-0">
            <p className="max-w-3xl text-xl leading-8 tracking-[-0.025em] md:text-2xl md:leading-9">{project.summary}</p>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {[['Challenge', project.challenge], ['Approach', project.approach], ['Outcome', project.outcome]].map(([label, copy]) => copy ? (
                <section key={label as string}><h2 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">{label}</h2><p className="mt-2 text-sm leading-6 text-zinc-600">{copy}</p></section>
              ) : null)}
            </div>
          </div>
        </div>
        {project.caseStudy?.length ? (
          <section className="py-20 md:py-28">
            <p className="text-xs font-semibold uppercase tracking-[0.14em]">Case study</p>
            <div className="mt-8">
              {project.caseStudy.map((section) => (
                <article className="border-t border-zinc-900/15 py-12 md:py-16" key={section.id}>
                  <div className="grid gap-6 md:grid-cols-[220px_1fr]">
                    <div>{section.eyebrow && <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#ee5a35]">{section.eyebrow}</p>}</div>
                    <div>
                      <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.045em] md:text-4xl">{section.heading}</h2>
                      <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-600">{section.body}</p>
                      {section.highlight && <p className="mt-6 max-w-2xl border-l-2 border-[#ee5a35] pl-4 text-sm font-medium leading-6">{section.highlight}</p>}
                    </div>
                  </div>
                  {getImage(section.referenceImage) ? (
                    <figure className="mt-10 md:mt-14">
                      <Image alt={getImage(section.referenceImage)?.alt ?? ''} className="w-full bg-zinc-100 object-cover" height={getImage(section.referenceImage)?.height ?? 1} src={getImage(section.referenceImage)?.url ?? ''} width={getImage(section.referenceImage)?.width ?? 1} />
                    </figure>
                  ) : (
                    <div className="mt-10 flex aspect-[16/8] items-center justify-center bg-zinc-100 text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-400 md:mt-14">Visual reference</div>
                  )}
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
