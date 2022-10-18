import React, { createContext, useContext } from 'react';
import { auth } from '../utils/firebase';

const LanguageContext = createContext();

export const LanguageContextProvider = ({ children }) => {
	const [lang, setLang] = React.useState('en');
	console.log(lang);

	const SetLanguage = (lg) => {
		auth.languageCode = { lang };
		return setLang(lg);
	};

	return (
		<LanguageContext.Provider value={{ lang, SetLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};

export const UserLanguage = () => {
	return useContext(LanguageContext);
};
