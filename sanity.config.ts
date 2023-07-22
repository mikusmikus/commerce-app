import { visionTool } from '@sanity/vision'
import { defaultDocumentNode, structure } from '@studio/structure'
import { type Config, defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

import { dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schema'

export default defineConfig<Config>({
  basePath: '/studio',
  dataset,
  projectId,
  schema,
  title: 'Autumn store',

  plugins: [
    deskTool({
      structure,
      defaultDocumentNode,
    }),
    visionTool(),
  ],
})
