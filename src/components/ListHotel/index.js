import axios from 'axios';
import React from 'react';
import { useLocation } from 'react-router-dom';

export default function ListHotel() {
	const [loadingHotel, setLoadingHotel] = React.useState(true);

	const { state } = useLocation();
	const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
	const [listHotels, setListHotels] = React.useState([]);
	React.useEffect(() => {
		fetchHotelData();
	}, []);

	const fetchHotelData = async (token, value) => {
		try {
			const res = await axios.get(
				`http://localhost:3001/api/hotel/`,
				value,
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				},
			);
			setListHotels(res.data);
			setLoadingHotel(false);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			{!loadingHotel
				? listHotels.map((hotel, _) => {
						return <p key={hotel._id}>{hotel.name}</p>;
				  })
				: null}
		</>
	);
}
