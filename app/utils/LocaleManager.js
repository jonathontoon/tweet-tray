import LocalizedStrings from 'react-localization';

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


class LocaleManager {
  constructor() {
    return new LocalizedStrings({
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
      ko: korean,
      sv: swedish,
      zh: chinese,
      'zh-CN': chineseCN,
      'zh-TW': chineseTW,
    });
  }
}

export default LocaleManager;
