import React, { useEffect } from 'react';
import ResetPasswordForm from '../../components/ResetPasswordForm';
import DogImg from '../../assets/images/Wallpaper-Linz-Doggies-Turquiose-1.webp';
import './style.css';
import { motion } from 'framer-motion';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import InValidDisplay from './../../components/InvalidCodeReset/index';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useTranslation } from 'react-i18next';
import { BsCheck2Circle } from 'react-icons/bs';
import axios from 'axios';
import { uid } from 'uid';

export default function BookingConfirm() {
	const [loading, setLoading] = React.useState(true);
	const [t] = useTranslation();
	const location = useLocation();
	const id = location.pathname.split('/')[2];

	const [dataList, setDataList] = React.useState([]);

	useEffect(() => {
		fetchSuccess();
	}, []);

	const fetchSuccess = async () => {
		try {
			const res = await axios.put(
				`http://localhost:3001/api/order/confirm/success/${id}`,
			);

			setDataList(res.data);
			await handleUpdateDate(res.data);
			console.log(res.data);
			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	const getDatesInRange = (startDate, endDate) => {
		const start = new Date(startDate);
		const end = new Date(endDate);
		const date = new Date(start.getTime());

		const dates = [];

		while (date <= end) {
			dates.push(new Date(date).getTime());
			date.setDate(date.getDate() + 1);
		}

		return dates;
	};

	const handleUpdateDate = async (data) => {
		try {
			if (data.service === 'hotel') {
				const alldates = getDatesInRange(data.start, data.end);

				await Promise.all(
					data.products.map((room) => {
						const res = axios.put(
							`http://localhost:3001/api/hotel-room/availability/${room.roomId}`,
							{
								dates: alldates,
							},
						);
						return res.data;
					}),
				);
			}

			if (data.service === 'grooming') {
				const eventID = uid();
				await Promise.all(
					data.products.map((room) => {
						console.log(room);
						const res = axios.put(
							`http://localhost:3001/api/grooming/availability/${room.roomId}`,
							{
								dates: {
									name: data?.name,
									startDate: data?.start,
									endDate: data?.end,
									id: eventID?.id,
									title: data?.name,
									order: data,
								},
							},
						);
						return res.data;
					}),
				);
			}
		} catch (err) {}
	};

	return (
		<>
			{loading ? (
				<LoadingSpinner />
			) : (
				<div
					style={{
						backgroundImage: ` linear-gradient(rgba(255,255,255,.6), rgba(255,255,255,.4)),url(${DogImg})`,
					}}
					className='confirmBooking'>
					<div className='confirmBooking-form'>
						<div
							style={{
								textAlign: 'center',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								flexDirection: 'column',
							}}>
							<BsCheck2Circle
								color='#4BB543'
								style={{
									fontSize: 50,
									marginBottom: 30,
								}}></BsCheck2Circle>
							<h1 style={{ fontWeight: 700 }}>
								{t('Confirmation Booking Successfully')}
							</h1>
							<p
								style={{
									fontWeight: 600,
									color: '#444',
								}}>
								{' '}
								{t(
									`Booking #${id} are confirmed. 
									`,
								)}
							</p>
							<p
								style={{
									fontWeight: 400,
									color: '#999',
									fontStyle: 'italic',
								}}>
								{' '}
								{t(
									` 
									Thank you for choosing Pet88`,
								)}
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
