import LocalizedStrings from 'react-localization';

import english from '../localizations/en.json';
import englishAU from '../localizations/en-AU.json';
import englishCA from '../localizations/en-CA.json';
import englishGB from '../localizations/en-GB.json';
import englishNZ from '../localizations/en-NZ.json';
import englishUS from '../localizations/en-US.json';
import englishZA from '../localizations/en-ZA.json';

import german from '../localizations/de.json';
import germanDE from '../localizations/de-DE.json';
import germanCH from '../localizations/de-CH.json';
import germanAT from '../localizations/de-AT.json';

import korean from '../localizations/ko.json';
import swedish from '../localizations/sv.json';

import chinese from '../localizations/zh.json';
import chineseCN from '../localizations/zh-CN.json';
import chineseTW from '../localizations/zh-TW.json';

import french from '../localizations/fr.json';
import frenchCA from '../localizations/fr-CA.json';
import frenchCH from '../localizations/fr-CH.json';
import frenchFR from '../localizations/fr-FR.json';

import japanese from '../localizations/ja.json';

import dutch from '../localizations/nl.json';


class LocaleManager {
  constructor() {
    return new LocalizedStrings({
      en: english,
      'en-AU': englishAU,
      'en-CA': englishCA,
      'en-GB': englishGB,
      'en-NZ': englishNZ,
      'en-US': englishUS,
      'en-ZA': englishZA,
      de: german,
      'de-DE': germanDE,
      'de-CH': germanCH,
      'de-AT': germanAT,
      fr: french,
      'fr-CA': frenchCA,
      'fr-CH': frenchCH,
      'fr-FR': frenchFR,
      ko: korean,
      sv: swedish,
      nl: dutch,
      zh: chinese,
      'zh-CN': chineseCN,
      'zh-TW': chineseTW,
      ja: japanese,
    });
  }
}

export default LocaleManager;
