import React, { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
	Calendar,
	Views,
	DateLocalizer,
	momentLocalizer,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import events from '../../data/events';
import { useState } from 'react';
import { useCallback } from 'react';

// const DnDCalendar = withDragAndDrop(Calendar);
const mLocalizer = momentLocalizer(moment);

const ColoredDateCellWrapper = ({ children }) =>
	React.cloneElement(React.Children.only(children), {
		style: {
			backgroundColor: 'lightblue',
		},
	});

export function Basic({
	localizer = mLocalizer,
	showDemoLink = true,
	...props
}) {
	const { components, defaultDate, max, views } = useMemo(
		() => ({
			components: {
				timeSlotWrapper: ColoredDateCellWrapper,
			},
			defaultDate: new Date(2015, 3, 1),

			views: Object.keys(Views).map((k) => Views[k]),
		}),
		[],
	);

	return (
		<Fragment>
			<div style={{ height: 600 }} {...props}>
				<Calendar
					components={components}
					defaultDate={defaultDate}
					events={events}
					localizer={localizer}
					max={max}
					showMultiDayTimes
					step={60}
					views={views}
				/>
			</div>
		</Fragment>
	);
}
Basic.propTypes = {
	localizer: PropTypes.instanceOf(DateLocalizer),
	showDemoLink: PropTypes.bool,
};

export function Selectable({ localizer }) {
	const [myEvents, setEvents] = useState(events);

	const handleSelectSlot = useCallback(
		({ start, end }) => {
			const title = window.prompt('New Event name');
			if (title) {
				setEvents((prev) => [...prev, { start, end, title }]);
			}
		},
		[setEvents],
	);

	const handleSelectEvent = useCallback(
		(event) => window.alert(event.title),
		[],
	);

	const { defaultDate, scrollToTime } = useMemo(
		() => ({
			defaultDate: new Date(2015, 3, 12),
			scrollToTime: new Date(1970, 1, 1, 6),
		}),
		[],
	);

	return (
		<Fragment>
			<div style={{ height: 600 }}>
				<Calendar
					defaultDate={defaultDate}
					defaultView={Views.WEEK}
					events={myEvents}
					localizer={localizer}
					onSelectEvent={handleSelectEvent}
					onSelectSlot={handleSelectSlot}
					selectable
					scrollToTime={scrollToTime}
				/>
			</div>
		</Fragment>
	);
}

Selectable.propTypes = {
	localizer: PropTypes.instanceOf(DateLocalizer),
};

const DragAndDropCalendar = withDragAndDrop(Calendar);

export function DragAndDrop({ localizer }) {
	const [myEvents, setMyEvents] = useState(events);

	const moveEvent = useCallback(
		({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
			const { allDay } = event;
			if (!allDay && droppedOnAllDaySlot) {
				event.allDay = true;
			}

			setMyEvents((prev) => {
				const existing = prev.find((ev) => ev.id === event.id) ?? {};
				const filtered = prev.filter((ev) => ev.id !== event.id);
				return [...filtered, { ...existing, start, end, allDay }];
			});
		},
		[setMyEvents],
	);

	const resizeEvent = useCallback(
		({ event, start, end }) => {
			setMyEvents((prev) => {
				const existing = prev.find((ev) => ev.id === event.id) ?? {};
				const filtered = prev.filter((ev) => ev.id !== event.id);
				return [...filtered, { ...existing, start, end }];
			});
		},
		[setMyEvents],
	);

	const defaultDate = useMemo(() => new Date(2015, 3, 12), []);

	return (
		<Fragment>
			<div style={{ height: 600 }}>
				<DragAndDropCalendar
					defaultDate={defaultDate}
					defaultView={Views.MONTH}
					events={myEvents}
					localizer={localizer}
					onEventDrop={moveEvent}
					onEventResize={resizeEvent}
					popup
					resizable
				/>
			</div>
		</Fragment>
	);
}
DragAndDrop.propTypes = {
	localizer: PropTypes.instanceOf(DateLocalizer),
};
