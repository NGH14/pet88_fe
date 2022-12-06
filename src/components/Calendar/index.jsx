import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import React, { useCallback, useMemo, useState } from 'react';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { uid } from 'uid';
import {
	Button,
	Calendar,
	Col,
	ConfigProvider,
	Dropdown,
	Menu,
	Radio,
	Row,
	Select,
	Typography,
} from 'antd';

import {
	Calendar as RB,
	dateFnsLocalizer,
	momentLocalizer,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'moment/locale/vi';
import 'moment/locale/en-gb';
import { UserLanguage } from '../../context/LanguageContext';

import viVN from 'antd/es/locale/vi_VN';
import './style.css';
import { useTranslation } from 'react-i18next';
import { display } from '@mui/system';
import axios from 'axios';
const DnDCalendar = withDragAndDrop(RB);
const events = [
	{
		id: uid(),
		title: 'Big Meeting',
		allDay: true,
		start: new Date(2022, 11, 1),
		end: new Date(2022, 11, 15),
	},
];

const langMessage = {
	en: {
		previous: '<',
		next: '>',
	},
	vi: {
		week: 'Tuần',
		work_week: 'Ngày trong tuần',
		day: 'Ngày',
		month: 'Tháng',
		previous: '<',
		next: '>',
		today: 'Hôm nay',
		agenda: 'Lịch trình',
		date: 'Ngày',
		time: 'Thời gian',
		event: 'Sự kiện',
		allDay: 'cả ngày',
		noEventsInRange: 'Không có sự kiện nào',

		showMore: (total) => `+${total} Xem Thêm`,
	},
};

export const CalendarAdmin = () => {
	const { lang } = UserLanguage();
	const [allEvents, setAllEvents] = useState(events);
	const [event, setEvent] = useState({});
	const [defaultDate, setDefaultDate] = useState(new Date());
	const { t } = useTranslation();
	const localizer = momentLocalizer(moment);

	React.useEffect(() => {
		fetchEvent();
	}, []);
	console.log(allEvents);
	const fetchEvent = async () => {
		try {
			const res = await axios.get(
				`http://localhost:3001/api/grooming/room/638f979055276f9e46d5c056`,
			);

			const list = [];
			res.data.unavailableDates.map((data) => {
				return list.push({
					start: new Date(data.startDate),
					end: new Date(data.endDate),
					id: data.id,
					title: data.title,
				});
			});

			setAllEvents((prev) => [...prev, ...list]);

			console.log({ list });
		} catch (error) {
			console.error(error);
		}
	};

	const AddEvent = async (value) => {
		try {
			const res = await axios.put(
				`http://localhost:3001/api/grooming/availability/638f979055276f9e46d5c056`,
				{
					dates: {
						startDate: value.start,
						endDate: value.start,
						id: uid(),
						title: value.title,
					},
				},
			);

			// setAllEvents((prev) => [...prev, ...list]);

			console.log({ res });
		} catch (error) {
			console.error(error);
		}
	};

	const onPanelChange = (value, mode) => {
		console.log(value.format('YYYY-MM-DD'), mode);
	};

	const onSubCalendarSelected = (newValue) => {
		setDefaultDate(newValue.toDate());
	};

	moment.locale(lang);

	const handleSelectEvent = useCallback(
		(event) => window.alert(event.title),
		[],
	);

	const { messages } = useMemo(
		() => ({
			messages: langMessage[lang],
		}),
		[lang],
	);

	const handleSelectSlot = useCallback(
		({ start, end }) => {
			const title = window.prompt('New Event name');
			if (title) {
				AddEvent({
					id: uid(),
					start: start.getTime(),
					end: end.getTime(),
					title,
				});

				setEvent({
					id: uid(),
					start: start.getTime(),
					end: end.getTime(),
					title,
				});
				setAllEvents((prev) => [
					...prev,
					{ id: uid(), start, end, title },
				]);
			}
		},
		[setAllEvents],
	);

	const moveEvent = useCallback(
		({
			event,
			start,
			end,
			resourceId,
			isAllDay: droppedOnAllDaySlot = true,
		}) => {
			const { allDay } = event;

			if (!allDay && droppedOnAllDaySlot) {
				event.allDay = true;
			}

			setAllEvents((prev) => {
				const existing = prev.find((ev) => ev.id === event.id) ?? {};
				const filtered = prev.filter((ev) => ev.id !== event.id);
				return [
					...filtered,
					{ ...existing, start, end, resourceId, allDay },
				];
			});
		},
		[setAllEvents],
	);

	const resizeEvent = useCallback(
		({ event, start, end }) => {
			setAllEvents((prev) => {
				const existing = prev.find((ev) => ev.id === event.id) ?? {};
				const filtered = prev.filter((ev) => ev.id !== event.id);
				return [...filtered, { ...existing, start, end }];
			});
		},
		[setAllEvents],
	);

	const onNavigate = useCallback(
		(newDate) => setDefaultDate(newDate),
		[setDefaultDate],
	);

	return (
		<ConfigProvider locale={lang === 'vi' && viVN}>
			<div className='calendar-container'>
				<div className='site-calendar-customize-header-wrapper'>
					<Calendar
						headerRender={({ value, onChange }) => {
							const date = value.format('MMMM, YYYY');
							const menu = (
								<Menu>
									<Menu.Item>
										<Button
											block
											size='middle'
											onClick={() => {
												const newValue = moment(
													value,
												).add(1, 'W');
												onChange(newValue);
											}}>
											1 {t('week')}
										</Button>
									</Menu.Item>
									<Menu.Item>
										<Button
											block
											size='middle'
											onClick={() => {
												const newValue = moment(
													value,
												).add(2, 'W');
												onChange(newValue);
											}}>
											2 {t('weeks')}
										</Button>
									</Menu.Item>
									<Menu.Item>
										<Button
											block
											size='middle'
											onClick={() => {
												const newValue = moment(
													value,
												).add(3, 'W');
												onChange(newValue);
											}}>
											3 {t('week')}
										</Button>
									</Menu.Item>
									<Menu.Item>
										<Button
											block
											size='middle'
											onClick={() => {
												const newValue = moment(
													value,
												).add(4, 'W');
												onChange(newValue);
											}}>
											4 {t('weeks')}
										</Button>
									</Menu.Item>
								</Menu>
							);
							return (
								<div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
										}}>
										<span
											style={{
												textTransform: 'capitalize',
												fontSize: 14,
												fontWeight: 600,
											}}>
											{date}
										</span>
										<div
											style={{ display: 'flex', gap: 5 }}>
											<Button
												style={{ padding: 0 }}
												type='text'
												onClick={() => {
													const newValue = moment(
														value,
													).subtract(1, 'M');
													onChange(newValue);
												}}>
												<IoIosArrowBack />
											</Button>
											<Button
												style={{ padding: 0 }}
												type='text'
												onClick={() => {
													const newValue = moment(
														value,
													).add(1, 'M');
													onChange(newValue);
												}}>
												<IoIosArrowForward />
											</Button>
										</div>
									</div>
									<Dropdown overlay={menu}>
										<Button
											block
											style={{
												marginBlock: 20,
												boxShadow:
													'rgb(112 144 176 / 20%) 0px 2px 8px',
											}}>
											{t('Quick Jump')}
										</Button>
									</Dropdown>
								</div>
							);
						}}
						fullscreen={false}
						onPanelChange={onPanelChange}
						onSelect={onSubCalendarSelected}
					/>
				</div>

				<DnDCalendar
					views={['day', 'week', 'month', 'agenda']}
					resizable
					startAccessor='start'
					endAccessor='end'
					onSelectEvent={handleSelectEvent}
					onSelectSlot={handleSelectSlot}
					selectable={true}
					messages={messages}
					localizer={localizer}
					date={defaultDate}
					culture={lang}
					events={allEvents}
					defaultView='day'
					onNavigate={onNavigate}
					onEventResize={resizeEvent}
					onEventDrop={moveEvent}
					step={15}
					popup
				/>
			</div>
		</ConfigProvider>
	);
};
