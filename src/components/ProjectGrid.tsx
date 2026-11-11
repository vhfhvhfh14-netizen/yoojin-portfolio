'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

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
  const [activeType, setActiveType] = useState('all')
  const types = ['all', ...Array.from(new Set(projects.map((project) => project.projectType)))]
  const visibleProjects = activeType === 'all' ? projects : projects.filter((project) => project.projectType === activeType)

  return (
    <>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {types.map((type) => (
          <button
            className={`border-b pb-1 text-xs transition ${activeType === type ? 'border-zinc-900 font-semibold text-zinc-900' : 'border-transparent text-zinc-500 hover:text-zinc-900'}`}
            key={type}
            onClick={() => setActiveType(type)}
          >
            {type === 'all' ? 'All projects' : labels[type]}
          </button>
        ))}
      </div>
      {visibleProjects.length ? (
        <div className="mt-10 grid gap-x-5 gap-y-12 md:grid-cols-2">
          {visibleProjects.map((project, index) => (
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
        <p className="mt-12 border-t border-zinc-900/15 pt-6 text-sm text-zinc-500">이 유형의 프로젝트는 아직 준비 중입니다.</p>
      )}
    </>
  )
}
