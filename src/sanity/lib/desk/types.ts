import {type ResolveProductionUrlContext} from 'sanity'
import {type DefaultDocumentNodeContext, type StructureBuilder, type View, type ViewBuilder} from 'sanity/desk'

export type StructureViewsResolver = (
  S: StructureBuilder,
  ctx: DefaultDocumentNodeContext
) => (View | ViewBuilder)[]

export type DocumentURLResolver = (
  ctx: ResolveProductionUrlContext
) => Promise<string | null | undefined>

declare module 'sanity' {
  export interface DocumentOptions {
    views?: StructureViewsResolver
    url?: DocumentURLResolver
  }
}
