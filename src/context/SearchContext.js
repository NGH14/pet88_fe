import React, { createContext, useContext } from 'react';

const SearchContext = createContext();

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

export const SearchContextProvider = ({ children }) => {
	const [search, setSearch] = React.useState(
		JSON.parse(localStorage.getItem('search')) || {
			services: 'hotel',
			city: 'Ha Noi',
			foundNumber: null,
			datesHotels: null,
			datesGrooming: null,
			days: 0,
		},
	);

	const setSearchList = (data) => {
		function dayDifference() {
			if (!data.datesHotels || data.datesHotels?.length === 0)
				return null;

			const timeDiff = Math.abs(
				data.datesHotels[1].toDate().getTime() -
					data.datesHotels[0].toDate().getTime(),
			);
			const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
			return diffDays;
		}
		const daysDiff = dayDifference(data);
		const newData = {
			...data,
			days: daysDiff,
		};

		localStorage.setItem('search', JSON.stringify(newData));
		return setSearch(newData);
	};

	return (
		<SearchContext.Provider value={{ search, setSearchList }}>
			{children}
		</SearchContext.Provider>
	);
};

export const SearchData = () => {
	return useContext(SearchContext);
};
