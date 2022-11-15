import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import React, { useCallback, useMemo, useState } from 'react';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { uid } from 'uid';

import { Calendar as RB, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';


import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'; 
import 'moment/locale/vi';
import 'moment/locale/en-gb';
import { UserLanguage } from '../../context/LanguageContext';


const DnDCalendar = withDragAndDrop(RB)


const events = [
	{
		id: uid(),
		title: 'Big Meeting',
		allDay: true,
		start: new Date(2022, 11, 1),
		end: new Date(2022, 11, 15),

	},
	{
		title: 'Vacation',
		start: new Date(2021, 6, 7),
		end: new Date(2021, 6, 10),
	},
	{
		title: 'Conference',
		start: new Date(2021, 6, 20),
		end: new Date(2021, 6, 23),
	},
];



const langMessage = {
	en: null,
	vi: {
	  week: 'Tuần',
	  work_week: 'Ngày trong tuần',
	  day: 'Ngày',
	  month: 'Tháng',
	  previous: 'Trước',
	  next: 'Sau',
	  today: 'Hôm nay',
	  agenda: 'Lịch trình',
	  date: 'Lich',

  
	  showMore: (total) => `+${total} Thêm`,
	},
  }
  

export const CalendarAdmin = () => {

	const { lang } = UserLanguage();

	const [allEvents, setAllEvents] = useState(events);
	const localizer = momentLocalizer(moment) 
	

	const handleSelectEvent = useCallback(
		(event) => window.alert(event.title),
		[]
	  )

	  console.log(allEvents)
	

	
  
  const { defaultDate, messages } = useMemo(
    () => ({
      defaultDate: new Date(),
      messages: langMessage[lang],
    }),
    [lang]
  )

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event name')
      if (title) {
        setAllEvents((prev) => [...prev, { id: uid(), start, end, title }])
      }
    },
    [setAllEvents]
  )


  const moveEvent = useCallback(
    ({
      event,
      start,
      end,
      resourceId,
      isAllDay: droppedOnAllDaySlot = false,
    }) => {
      const { allDay } = event

      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true
      }

      setAllEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end, resourceId, allDay }]
      })
    },
    [setAllEvents]
  )

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
	
		setAllEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end }]
      })
    },
    [setAllEvents]
  )



	return (

		<div className='App'>
			<h1>Calendar</h1>
			<h2>Add New Event</h2>
			{/* <div>
				<input
					type='text'
					placeholder='Add Title'
					style={{ width: '20%', marginRight: '10px' }}
					value={newEvent.title}
					onChange={(e) =>
						setNewEvent({ ...newEvent, title: e.target.value })
					}
				/>
				<DatePicker
					placeholderText='Start Date'
					style={{ marginRight: '10px' }}
					selected={newEvent.start}
					onChange={(start) => setNewEvent({ ...newEvent, start })}
				/>
				<DatePicker
					placeholderText='End Date'
					selected={newEvent.end}
					onChange={(end) => setNewEvent({ ...newEvent, end })}
				/>
				<button stlye={{ marginTop: '10px' }} onClick={handleAddEvent}>
					Add Event
				</button>

		
			</div> */}
			<DnDCalendar
			resizable
			
			startAccessor='start'
			endAccessor='end'
			onSelectEvent={handleSelectEvent}
			onSelectSlot={handleSelectSlot}
			selectable={true}
			messages={messages}
			localizer={localizer}
			defaultDate={defaultDate}
			culture={lang}
			events={allEvents}
			onEventResize={resizeEvent}
			onEventDrop={moveEvent}
			style={{ height: 500, margin: '50px' }}
			popup
			/>
		</div>
	);
};
