import { unstable_cache } from 'next/cache'
import { getPayloadClient } from '@/lib/payload'
import type { ProjectCardData } from '@/components/ProjectGrid'

function mediaImage(media: unknown): ProjectCardData['image'] {
  if (!media || typeof media !== 'object' || !('url' in media)) return null
  const value = media as { url?: string | null; alt?: string | null; width?: number | null; height?: number | null }
  if (!value.url || !value.width || !value.height) return null
  return { url: value.url, alt: value.alt ?? '', width: value.width, height: value.height }
}

export const getProjects = unstable_cache(
  async (): Promise<ProjectCardData[]> => {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'projects', depth: 1, limit: 100, overrideAccess: false, sort: 'sortOrder' })
    return result.docs.map((project) => ({
      id: String(project.id),
      title: project.title,
      slug: project.slug,
      projectType: project.projectType,
      period: project.period ?? null,
      contribution: project.contribution ?? null,
      image: mediaImage(project.thumbnail),
    }))
  },
  ['projects'],
  { tags: ['projects'] },
)
