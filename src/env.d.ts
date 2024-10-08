/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare module 'hero-patterns'
declare module 'lunr'
declare module 'photoswipe-dynamic-caption-plugin'
declare module '@akebifiky/remark-simple-plantuml'

interface ImportMetaEnv {
    readonly SUPABASE_URL: string
    readonly SUPABASE_ANON_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}