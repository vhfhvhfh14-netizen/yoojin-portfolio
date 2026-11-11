import Image from 'next/image'
import Link from 'next/link'

export type ProjectCardData = {
  id: string
  title: string
  slug: string
  projectType: string
  period: string | null
  contribution: string | null
  image: { url: string; alt: string; width: number; height: number } | null
}

const labels: Record<string, string> = {
  'mobile-app': 'Mobile App',
  'web-service': 'Web Service',
  dashboard: 'Dashboard',
  redesign: 'Redesign',
  'design-system': 'Design System',
}

export function ProjectGrid({ projects }: { projects: ProjectCardData[] }) {
  return (
    projects.length ? (
      <div className="grid gap-x-5 gap-y-12 md:grid-cols-2">
        {projects.map((project, index) => (
            <article className={index % 2 ? 'md:mt-24' : ''} key={project.id}>
              <Link className="group block overflow-hidden bg-[#e8e5de]" href={`/projects/${project.slug}`}>
                {project.image ? (
                  <Image
                    alt={project.image.alt}
                    className="aspect-[1.12/1] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    height={project.image.height}
                    src={project.image.url}
                    width={project.image.width}
                  />
                ) : (
                  <div className="aspect-[1.12/1]" />
                )}
              </Link>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl tracking-[-0.05em]">{project.title}</h2>
                  <p className="mt-1 text-xs text-zinc-500">{labels[project.projectType]} · {project.contribution ?? 'UX/UI Design'}</p>
                </div>
                <span className="pt-1 text-xs text-zinc-500">{project.period ?? ''}</span>
              </div>
            </article>
        ))}
      </div>
    ) : (
      <p className="border-t border-zinc-900/15 pt-6 text-sm text-zinc-500">프로젝트를 준비하고 있습니다.</p>
    )
  )
}
