// 1. Import your utilities and schemas
import { z, defineCollection, reference } from 'astro:content'
import { rssSchema } from '@astrojs/rss'

// 2. Define your collections
const blog = defineCollection({
  schema: ({ image }) =>
    rssSchema.extend({
      draft: z.boolean().optional(),
      author: reference('author').optional(),
      coverSVG: image().optional(),
      coverImage: image().optional(),
      socialImage: image().optional(),
      images: z.array(image()).optional(),
      gallery: z.string().optional(),
      categories: z.array(reference('category')).optional(),
      tags: z.array(z.string()).optional(),
      extra: z.array(z.enum(['math', 'markmap', 'mermaid', 'gallery'])).optional(),
      minutesRead: z.string().optional(),

      // Adicionando elementos de Landing Page e Funil de Vendas
      headline: z.string().optional(), // Título chamativo
      subheadline: z.string().optional(), // Subtítulo para mais informações
      ctaButtonText: z.string().optional(), // Texto do botão de chamada para ação (CTA)
      ctaButtonLink: z.string().optional(), // Link do botão CTA
      testimonials: z.array(z.object({ // Depoimentos de clientes
        name: z.string(),
        content: z.string(),
        company: z.string().optional(),
      })).optional(),
      scarcity: z.string().optional(), // Elemento de escassez (ex: "Oferta válida até...")
      urgency: z.string().optional(), // Elemento de urgência (ex: "Últimas vagas!")
      guarantee: z.string().optional(), // Garantia oferecida (ex: "Satisfação garantida ou seu dinheiro de volta")
      faq: z.array(z.object({ // Perguntas frequentes
        question: z.string(),
        answer: z.string(),
      })).optional(),
      results: z.string().optional(), // Prova científica ou resultados obtidos
      postSaleSteps: z.string().optional(), // Próximos passos pós-venda
      videoUrl: z.string().optional(), // URL de vídeo para o conteúdo
      contentWritten: z.string().optional(), // Conteúdo escrito do artigo
    })
})

const page = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      author: reference('author').optional(),
      pubDate: z.date().optional(),
      coverSVG: image().optional(),
      coverImage: image().optional(),
      socialImage: image().optional(),
      images: z.array(image()).optional(),
      gallery: z.string().optional(),
      tags: z.array(z.string()).optional(),
      extra: z.array(z.enum(['math', 'markmap', 'mermaid', 'gallery'])).optional()
    })
})
const doc = defineCollection({
  schema: ({ image }) =>
    z.object({
      draft: z.boolean().optional(),
      section: z.string(),
      weight: z.number().default(0),
      title: z.string(),
      description: z.string(),
      images: z.array(image()).optional(),
      gallery: z.string().optional()
    })
})

const category = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      coverSVG: image(),
      socialImage: image()
    })
})

const author = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      contact: z.string()
    })
})

const social = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    link: z.string(),
    icon: z.string()
  })
})

// 3. Export multiple collections to register them
export const collections = {
  blog,
  page,
  doc,
  category,
  author,
  social
}
