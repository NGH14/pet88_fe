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
	Cascader,
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
import {
	RiCalendarEventFill,
	RiCloseFill,
	RiCloseLine,
	RiDeleteBinLine,
	RiEditLine,
	RiFileTextLine,
} from 'react-icons/ri';

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
	const [selectedGroomingRoomId, setSelectedGroomingRoomId] = useState('');
	const [groomingListOption, setGroomingListOption] = useState({});
	const [defaultDate, setDefaultDate] = useState(new Date());
	const [defaulGroomingOpion, setDefaulGroomingOpion] = useState([]);

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

	const onChange = (value, selectedOptions) => {
		console.log({ value, selectedOptions });
		setSelectedGroomingRoomId(selectedOptions[1].value);
		fetchEvent(selectedOptions[1].value);
	};
	const filter = (inputValue, path) =>
		path.some(
			(option) =>
				option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >
				-1,
		);

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
		fetchGroomingData();
	}, []);

	React.useEffect(() => form.resetFields(), [openCreateModal]);
	const fetchGroomingData = async () => {
		try {
			const res = await axios.get(`http://localhost:3001/api/grooming`);

			const list = [];
			res.data.map((data) => {
				const children = data.roomNumbers?.map((r) => {
					return {
						value: r?._id,
						label: `Room ${r?.number}`,
					};
				});
				return list.push({
					value: data.title,
					label: data.title,
					children,
				});
			});

			setGroomingListOption(list);
			setDefaulGroomingOpion([list[0].value, list[0].children[0].value]);
			fetchEvent(list[0].children[0].value);
		} catch (error) {
			console.error(error);
		}
	};

	const fetchEvent = async (id) => {
		const roomId = id || selectedGroomingRoomId;
		try {
			const res = await axios.get(
				`http://localhost:3001/api/grooming/room/${roomId}`,
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

			setAllEvents(list);
		} catch (error) {
			console.error(error);
		}
	};

	const FetchAddEvent = async (value) => {
		try {
			await axios.put(
				`http://localhost:3001/api/grooming/availability/${selectedGroomingRoomId}`,
				{
					dates: {
						startDate: value.start,
						endDate: value.end,
						id: uid(),
						title: value.title,
					},
				},
			);
		} catch (error) {
			console.error(error);
		}
	};

	const FetchUpdateEvent = async (value) => {
		const startDate = value?.start || selecteDetaildDate.start.getTime();
		const endDate = value?.end || selecteDetaildDate.end.getTime();
		const title = value?.title || selecteDetaildDate.title;
		const id = value?.id || selecteDetaildDate.id;

		try {
			await axios.put(
				`http://localhost:3001/api/grooming/room/event/${id}`,
				{
					startDate,
					endDate,
					title,
				},
			);
		} catch (error) {
			console.error(error);
		}
	};

	const FetchDeleteEvent = async (value) => {
		const id = value?.id || selecteDetaildDate.id;

		try {
			await axios.put(
				`http://localhost:3001/api/grooming/room/event/delete/${id}`,
			);
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
		setSelecteDetailType(false);
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
			FetchUpdateEvent({ start, end, title: event.title, id: event.id });

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
			FetchUpdateEvent({ start, end, title: event.title, id: event.id });

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
			FetchAddEvent({
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
			setAllEvents((prev) => [...prev, { id: uid(), start, end, title }]);

			setOpenCreateModal(false);
		}
	};

	const onFinishUpdateEvent = (values) => {
		const title = values?.title;

		if (values?.title) {
			FetchUpdateEvent(values);
			setAllEvents(
				allEvents.map((obj) => {
					if (obj.id === selecteDetaildDate.id) {
						return { ...obj, title };
					}
					return obj;
				}),
			);
			setOpenCreateModal(false);
		}
		setOpenDetailModal(false);
	};

	const handleDeleteEvent = () => {
		FetchDeleteEvent(selecteDetaildDate.id);
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
							colon={false}
							form={form}
							name='horizontal_login'
							layout='horizontal'
							onFinish={onFinishCreateEvent}
							requiredMark={false}>
							<Form.Item
								label={
									<RiFileTextLine
										style={{
											fontSize: 14,
											textTransform: 'capitalize',
										}}></RiFileTextLine>
								}
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
									label={
										<RiCalendarEventFill
											style={{
												fontSize: 14,
												textTransform: 'capitalize',
											}}></RiCalendarEventFill>
									}
									name='start'
									style={{
										display: 'flex',
										alignContent: 'center',
									}}>
									<span>
										{moment(
											new Date(
												selectedDate?.start,
											).getTime(),
										).format(
											'dddd, DD MMM YYYY _ hh:mm A',
										)}{' '}
										-{' '}
										{moment(
											new Date(
												selectedDate?.end,
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
						closable={false}
						title={
							<div
								style={{
									width: '100%',
									cursor: 'move',
									display: 'flex',
									justifyContent: 'flex-end',
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
								<Button
									type='text'
									onClick={() =>
										setOpenDetailModal(false)
									}>
									<RiCloseFill style={{ fontSize: 18}}></RiCloseFill>{' '}
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
								<div
									ref={draggleRef}
									style={{
									
									}}>
									{modal}
								</div>
							</Draggable>
						)}
						centered
						open={openDetailModal}
						onOk={() => setOpenDetailModal(false)}
						footer={null}
						onCancel={() => setOpenDetailModal(false)}>
						<Form
							colon={false}
							form={form}
							name='horizontal_login'
							layout='horizontal'
							onFinish={onFinishUpdateEvent}
							requiredMark={false}>
							<Form.Item
								label={
									<RiFileTextLine
										style={{
											fontSize: 14,

											textTransform: 'capitalize',
										}}></RiFileTextLine>
								}
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
									label={
										<RiCalendarEventFill
											style={{
												fontSize: 14,
												textTransform: 'capitalize',
											}}></RiCalendarEventFill>
									}
									style={{
										display: 'flex',
										alignContent: 'center',
									}}>
									<span>
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

					{groomingListOption.length > 0 ? (
						<Cascader
							style={{ width: '100%' }}
							size='middle'
							matchInputWidth
							defaultValue={defaulGroomingOpion}
							block
							options={groomingListOption}
							onChange={onChange}
							placeholder='Please select'
							showSearch={{
								filter,
							}}
							onSearch={(value) => console.log(value)}
						/>
					) : null}
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
