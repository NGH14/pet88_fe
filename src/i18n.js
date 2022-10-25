import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationVI from './utils/locales/vi/translation.json';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
	vi: {
		translation: translationVI,
	},
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
		lng: localStorage.getItem('lng') || 'en',
	});

export default i18n;
