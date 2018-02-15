const { remote, } = window.require('electron');

const Locale = () => {
    const locales = ["ar", "bg", "ca", "cs", "da", "de", "de-AT", "de-CH", "de-DE", "el", "en", "en-AU", "en-CA", "en-GB", "en-NZ", "en-US", "en-ZA", "es","es-419", "eu", "fa", "fi", "fil", "fr", "fr-CA", "fr-CH", "fr-FR", "ga", "gl", "gu", "he", "hi", "hr", "hu", "id", "is", "it", "it-CH", "it-IT", "ja", "kn", "ko", "mr", "ms", "nl", "nn", "no", "pl", "pt", "pt-BR", "pt-PT", "ro", "ru", "sk", "sr", "sv", "ta", "th", "tr", "uk", "ur", "vi", "zh", "zh-CN", "zh-TW"];

    let locale = remote.app.getLocale();

    if (locale === null || locale === undefined || locales.indexOf(locale) === -1) {
        return 'en-US';
    }

    return locale;
};

export default Locale;