const ParseLocale = (providedLocale) => {
  const locales = ['ar', 'bn', 'cs', 'da', 'de', 'el', 'en-AU', 'en-CA', 'en-GB', 'en-NZ', 'en-US', 'en-ZA', 'es', 'fa', 'fi', 'fil', 'fr', 'he', 'hi', 'hr', 'hu', 'id', 'it', 'ja', 'ko', 'msa', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sv', 'th', 'tr', 'uk', 'ur', 'vi', 'zh', 'zh-CN', 'zh-TW', ];

  let locale = providedLocale;

  // Capture language from locale if not English or Chinese
  if (!locale.includes('zh-') && !locale.includes('en-')) {
    if (locale.includes('-')) {
      const splitLocale = locale.split('-');
      locale = splitLocale[0];
    }
  }

  // Default to English US if nothing can be provided
  if (locale === null || locale === undefined || locales.indexOf(locale) === -1) {
    locale = 'en-US';
  }

  return locale;
};

export default ParseLocale;
