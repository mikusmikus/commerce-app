
import { ActivityIcon } from '@sanity/icons';
import { PagePreview } from '@studio/PagePreview';
import { type DefaultDocumentNodeResolver, type StructureBuilder, type StructureResolver } from 'sanity/desk';

const hiddenDocTypes = (listItem: 
  { getId: () => string; }
  ) => !['homePage'].includes(listItem.getId());

export const structure: StructureResolver =  (S) => {
  return S.list()
    .title('Content')
    .items([Homepage(S), ...S.documentTypeListItems().filter(hiddenDocTypes)]);
};

const previewDocs = [''];

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S: StructureBuilder, context) => {
  const { schemaType } = context;

  if (previewDocs.includes(schemaType)) {
    return S.document().views([S.view.form(), S.view.component(PagePreview).title('Preview')]);
  }

  return S.document().views([S.view.form()]);
};

const Homepage = (S: StructureBuilder) => {
  return S.listItem()
    .title('Home page')
    .showIcon(true)
    .icon(ActivityIcon)
    .child(
      S.document()
        .schemaType('homePage')
        .documentId('homePage')
        .views([S.view.form(), S.view.component(PagePreview).title('Preview')])
    );
};
