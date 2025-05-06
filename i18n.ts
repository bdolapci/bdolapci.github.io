export const locales = ['en', 'de'];
export const defaultLocale = 'en';
export type Locale = (typeof locales)[number];

import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  const safeLocale = locale || defaultLocale;
  
  return {
    locale: safeLocale,
    messages: (await import(`./messages/${safeLocale}.json`)).default
  };
});

export function getStaticPaths() {
  return {
    paths: locales.map((locale) => ({ params: { locale } })),
    fallback: false
  };
}