import React, { createContext, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageContextProvider = ({ children }) => {
	const [lang, setLang] = React.useState(localStorage.getItem('lng') || 'en');

	const SetLanguage = (lg) => {
		setLang(lg);
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
