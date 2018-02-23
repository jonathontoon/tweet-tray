import LocalizedStrings from 'react-localization';

import englishAU from '../localizations/en-AU.json';
import englishCA from '../localizations/en-CA.json';
import englishGB from '../localizations/en-GB.json';
import englishNZ from '../localizations/en-NZ.json';
import englishUS from '../localizations/en-US.json';
import englishZA from '../localizations/en-ZA.json';

class LocaleManager {
  constructor() {
    return new LocalizedStrings({
      'en-AU': englishAU,
      'en-CA': englishCA,
      'en-GB': englishGB,
      'en-NZ': englishNZ,
      'en-US': englishUS,
      'en-ZA': englishZA,
    });
  }
}

export default LocaleManager;
