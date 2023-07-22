import { type SchemaTypeDefinition } from 'sanity';
import { homePage } from './schemas/documents/homePage';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage],
};
