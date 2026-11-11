import type { CollectionConfig } from 'payload'
import { revalidateTag } from 'next/cache'

const refreshProjectCache = ({ doc, previousDoc }: { doc: { slug?: string }; previousDoc?: { slug?: string } }) => {
  revalidateTag('projects', 'max')
  if (doc.slug) revalidateTag(`project:${doc.slug}`, 'max')
  if (previousDoc?.slug) revalidateTag(`project:${previousDoc.slug}`, 'max')
  return doc
}

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'projectType', 'period', 'updatedAt'],
    group: 'Portfolio',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [refreshProjectCache],
    afterDelete: [refreshProjectCache],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'projectType',
      type: 'select',
      required: true,
      options: [
        { label: 'Mobile App', value: 'mobile-app' },
        { label: 'Web Service', value: 'web-service' },
        { label: 'Dashboard', value: 'dashboard' },
        { label: 'Redesign', value: 'redesign' },
        { label: 'Design System', value: 'design-system' },
      ],
    },
    { name: 'period', type: 'text', admin: { description: 'Example: 2024.03 — 2024.08' } },
    { name: 'contribution', type: 'text', admin: { description: 'Example: UX/UI 100%' } },
    {
      name: 'roles',
      type: 'array',
      fields: [{ name: 'role', type: 'text', required: true }],
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Representative image shown in the project list' },
    },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'challenge', type: 'textarea' },
    { name: 'approach', type: 'textarea' },
    { name: 'outcome', type: 'textarea' },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
