import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationVI from './utils/locales/vi/translation.json';

const resources = {
	vi: {
		translation: translationVI,
	},
};

i18n.use(initReactI18next).init({
	resources,
	interpolation: {
		escapeValue: false,
	},
	lng: localStorage.getItem('lng') || 'en',
});

export default i18n;
