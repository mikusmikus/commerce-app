import { DocumentTextIcon } from '@sanity/icons';
import { defineType } from 'sanity';
import { title } from '../fields/title';

export const homePage = defineType({
  type: 'document',
  name: 'homePage',
  title: 'Front page',
  icon: DocumentTextIcon,
  fields: [title],
});
