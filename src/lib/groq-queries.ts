import { groq } from 'next-sanity';

export const HOME_PAGE_QUERY = groq`{
  "page" :*[_type == 'homePage'][0]{
    title,
  },
  "settings": "",
}`