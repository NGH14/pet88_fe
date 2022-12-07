import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import Draggable from 'react-draggable';

import { uid } from 'uid';
import {
	Button,
	Calendar,
	Col,
	ConfigProvider,
	DatePicker,
	Dropdown,
	Form,
	Input,
	Menu,
	Modal,
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
import { display, borderRadius } from '@mui/system';
import axios from 'axios';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
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
	const [formData, setFormdata] = useState({});

	const [defaultDate, setDefaultDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState({ start: 0, end: 0 });
	const [selecteDetaildDate, setSelectedDetailDate] = useState({});
	const [selecteDetailType, setSelecteDetailType] = useState(false);

	const [disabled, setDisabled] = useState(false);

	const { t } = useTranslation();
	const localizer = momentLocalizer(moment);
	const [openCreateModal, setOpenCreateModal] = useState(false);
	const [openDetailModal, setOpenDetailModal] = useState(false);

	const [form] = Form.useForm();

	const [bounds, setBounds] = useState({
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
	});
	const draggleRef = useRef(null);

	const onStart = (_event, uiData) => {
		const { clientWidth, clientHeight } = window.document.documentElement;
		const targetRect = draggleRef.current?.getBoundingClientRect();
		if (!targetRect) {
			return;
		}
		setBounds({
			left: -targetRect.left + uiData.x,
			right: clientWidth - (targetRect.right - uiData.x),
			top: -targetRect.top + uiData.y,
			bottom: clientHeight - (targetRect.bottom - uiData.y),
		});
	};

	React.useEffect(() => {
		fetchEvent();
	}, []);

	React.useEffect(() => form.resetFields(), [openCreateModal]);

	const fetchEvent = async () => {
		try {
			const res = await axios.get(
				`http://localhost:3001/api/grooming/room/639052acfad33d2f7e4c0461`,
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
				`http://localhost:3001/api/grooming/availability/639052acfad33d2f7e4c0461`,
				{
					dates: {
						startDate: value.start,
						endDate: value.end,
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

	const handleSelectEvent = useCallback((event) => {
		setOpenDetailModal(true);
		setSelecteDetailType(false)
		setSelectedDetailDate(event);
	}, []);

	const { messages } = useMemo(
		() => ({
			messages: langMessage[lang],
		}),
		[lang],
	);

	const handleSelectSlot = useCallback(
		({ start, end }) => {
			setOpenCreateModal(true);
			setSelectedDate({ start, end });
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

	const onFinishCreateEvent = (values) => {
		const start = selectedDate.start;
		const end = selectedDate.end;
		const title = values?.title;

		if (values?.title) {
			// AddEvent({
			// 	id: uid(),
			// 	start: start.getTime(),
			// 	end: end.getTime(),
			// 	title,
			// });

			setEvent({
				id: uid(),
				start: start.getTime(),
				end: end.getTime(),
				title,
			});
			setAllEvents((prev) => [...prev, { id: uid(), start, end, title }]);

			setOpenCreateModal(false);
		}
	};

	const onFinishUpdateEvent = (values) => {

		const title = values?.title;

		if (values?.title) {
			setAllEvents(allEvents.map(obj => {if (obj.id === selecteDetaildDate.id) { return {...obj, title} } return obj;}));
			setOpenCreateModal(false);
		}
		setOpenDetailModal(false);

	};

	const handleDeleteEvent = () => {
		setAllEvents(
			allEvents.filter((item) => item.id !== selecteDetaildDate.id),
		);
		setOpenDetailModal(false);
	};

	return (
		<ConfigProvider locale={lang === 'vi' && viVN}>
			<div className='calendar-container'>
				<div className='site-calendar-customize-header-wrapper'>
					<Modal
						title={
							<div
								style={{
									width: '100%',
									cursor: 'move',
								}}
								onMouseOver={() => {
									if (disabled) {
										setDisabled(false);
									}
								}}
								onMouseOut={() => {
									setDisabled(true);
								}}
								onFocus={() => {}}
								onBlur={() => {}}
								// end
							>
								{t('Add new event')}
							</div>
						}
						modalRender={(modal) => (
							<Draggable
								disabled={disabled}
								bounds={bounds}
								onStart={(event, uiData) =>
									onStart(event, uiData)
								}>
								<div ref={draggleRef}>{modal}</div>
							</Draggable>
						)}
						centered
						open={openCreateModal}
						onOk={() => setOpenCreateModal(false)}
						footer={null}
						onCancel={() => setOpenCreateModal(false)}>
						<Form
							form={form}
							name='horizontal_login'
							layout='horizontal'
							onFinish={onFinishCreateEvent}
							requiredMark={false}>
							<Form.Item
								name='title'
								rules={[
									{
										required: true,
										message: t('Please enter the title'),
									},
								]}>
								<Input placeholder={t('Enter event title')} />
							</Form.Item>

							<Form.Item
								style={{
									marginBottom: 0,
								}}>
								<Form.Item
									name='start'
									style={{
										display: 'flex',
										alignContent: 'center',
									}}>
									<span>
										<AiOutlineClockCircle
											style={{
												fontSize: 14,
												textTransform: 'capitalize',
											}}></AiOutlineClockCircle>{' '}
										{moment(
											new Date(
												selectedDate?.start,
											).getTime(),
										).format(
											'dddd, DD MMM YYYY __ hh:mm A',
										)}{' '}
										-{' '}
										{moment(
											new Date(
												selectedDate?.start,
											).getTime(),
										).format('hh:mm A')}{' '}
									</span>
								</Form.Item>
							</Form.Item>
							<Form.Item
								style={{
									display: 'flex',
									justifyContent: 'flex-end',
									marginBlock: '5px -5px',
								}}>
								<Button
									style={{
										marginInline: '0px 15px',
										height: 'fit-content',
										fontSize: 16,
										lineHeight: 1.8,
										borderRadius: 5,
									}}
									type='text'
									onClick={() => setOpenCreateModal(false)}>
									{t('Close')}
								</Button>
								<Button
									style={{
										height: 'fit-content',
										fontSize: 16,
										lineHeight: 1.8,
										borderRadius: 5,
										boxShadow:
											'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
									}}
									type='primary'
									htmlType='submit'>
									{t('Confirm')}
								</Button>
							</Form.Item>
						</Form>
					</Modal>

					<Modal
						title={
							<div
								style={{
									width: '100%',
									cursor: 'move',
								}}
								onMouseOver={() => {
									if (disabled) {
										setDisabled(false);
									}
								}}
								onMouseOut={() => {
									setDisabled(true);
								}}
								onFocus={() => {}}
								onBlur={() => {}}>
								<Button
									type='text'
									onClick={() => handleDeleteEvent()}>
									<RiDeleteBinLine></RiDeleteBinLine>{' '}
								</Button>
								<Button
									type='text'
									onClick={() =>
										setSelecteDetailType(!selecteDetailType)
									}>
									<RiEditLine></RiEditLine>{' '}
								</Button>
							</div>
						}
						modalRender={(modal) => (
							<Draggable
								disabled={disabled}
								bounds={bounds}
								onStart={(event, uiData) =>
									onStart(event, uiData)
								}>
								<div ref={draggleRef}>{modal}</div>
							</Draggable>
						)}
						centered
						open={openDetailModal}
						onOk={() => setOpenDetailModal(false)}
						footer={null}
						onCancel={() => setOpenDetailModal(false)}>
						<Form
							form={form}
							name='horizontal_login'
							layout='horizontal'
							onFinish={onFinishUpdateEvent}
							requiredMark={false}>
							<Form.Item
								name='title'
								rules={[
									{
										required: true,
										message: t('Please enter the title'),
									},
								]}>
								{selecteDetailType ? (
									<Input
										defaultValue={selecteDetaildDate?.title}
										placeholder={t('Enter event title')}
									/>
								) : (
									<span>{selecteDetaildDate?.title}</span>
								)}
							</Form.Item>
							<Form.Item
								style={{
									marginBottom: 0,
								}}>
								<Form.Item
									style={{
										display: 'flex',
										alignContent: 'center',
									}}>
									<span>
										<AiOutlineClockCircle
											style={{
												fontSize: 15,

												textTransform: 'capitalize',
											}}></AiOutlineClockCircle>{' '}
										{moment(
											new Date(
												selecteDetaildDate?.start,
											).getTime(),
										).format('hh:mm A')}{' '}
										-{' '}
										{moment(
											new Date(
												selecteDetaildDate?.end,
											).getTime(),
										).format('hh:mm A')}
									</span>
								</Form.Item>
							</Form.Item>

							<Form.Item
								style={{
									display: 'flex',
									justifyContent: 'flex-end',

									marginBlock: '5px -5px',
								}}>
								<Button
									style={{
										marginInline: '0px 15px',
										height: 'fit-content',
										fontSize: 16,
										lineHeight: 1.8,
										borderRadius: 5,
									}}
									type='text'
									onClick={() => setOpenDetailModal(false)}>
									{t('Close')}
								</Button>
								<Button
									style={{
										height: 'fit-content',
										fontSize: 16,
										lineHeight: 1.8,
										borderRadius: 5,
										boxShadow:
											'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
									}}
									type='primary'
									htmlType='submit'>
									{t('Confirm')}
								</Button>
							</Form.Item>
						</Form>
					</Modal>

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
												textTransform: 'capitalize',
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
					// eventPropGetter={(event) => {
					// 	const backgroundColor = event.allday ? 'yellow' : '#9999';
					// 	const border = event.allday ? 'yellow' : '#9999';

					// 	return { style: { backgroundColor,border } }
					//   }}

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
