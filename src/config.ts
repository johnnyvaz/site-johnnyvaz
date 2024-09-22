import { getCollection, type CollectionEntry } from 'astro:content'

export interface TagType {
  tag: string
  count: number
  pages: CollectionEntry<'blog'>[]
}

export const SiteMetadata = {
  title: 'Johnny Vaz',
  description: 'Site com meus conteúdos e serviços.',
  author: {
    name: 'Johnny Vaz',
    twitter: '@johnnyvaz10',
    url: 'https://johnnyvaz.com.br',
    email: 'contato@johnnyvaz.com.br',
    summary: 'Engenheiro de Software, Empreendedor, Mentor e Escritor'
  },
  location: 'Franca, São Paulo Brasil',
  latlng: [-20.5689, -47.3347] as [number, number],
  repository: 'https://github.com/johnnyvaz',
  buildTime: new Date()
}

export { default as Logo } from './assets/svg/astro/astro-icon-dark.svg'
export { default as LogoImage } from './assets/astro/astro-logo-dark.png'
export { default as FeaturedSVG } from './assets/svg/undraw/undraw_design_inspiration.svg'
export { default as DefaultSVG } from './assets/svg/undraw/undraw_my_feed.svg'
export { default as DefaultImage } from './assets/undraw/undraw_my_feed.png'

export const NavigationLinks = [
  { name: 'Home', href: '' },
  { name: 'Currículo', href: 'cv' },
  { name: 'Contato', href: 'contato' },
  { name: 'Blog', href: 'blog' },
  { name: 'Docs', href: 'doc/introduction' }
]

export const PAGE_SIZE = 6

export const GITHUB_EDIT_URL = `https://github.com/johnnyvaz/site-johnnyvaz/blob/main`

export const COMMUNITY_INVITE_URL = `https://astro.build/chat`

export type Sidebar = Record<string, { text: string; link: string }[]>

export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true
  })
  return posts.sort((a, b) =>
    a.data.pubDate && b.data.pubDate ? +b.data.pubDate - +a.data.pubDate : 0
  )
}
