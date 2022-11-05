import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import React, { useState } from 'react';
import { Calendar as RB, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'; 
import 'moment/locale/vi';
import 'moment/locale/en-gb';
import { UserLanguage } from '../../context/LanguageContext';




const events = [
	{
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

export const Calendar = () => {
	const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
	const [allEvents, setAllEvents] = useState(events);
	const { SetLanguage, lang } = UserLanguage();
	
	switch (lang) {
		case "en":
	moment.locale('en-gb');
			
			break;
			case "vi":
				moment.locale('vi'); 
						
						break;
	
	default: 
	moment.locale('en-gb');
			break;
	}

	
	const localizer = momentLocalizer(moment) 
	

	function handleAddEvent() {
		for (let i = 0; i < allEvents.length; i++) {
			const d1 = new Date(allEvents[i].start);
			const d2 = new Date(newEvent.start);
			const d3 = new Date(allEvents[i].end);
			const d4 = new Date(newEvent.end);
			/*
          (d1 <= d2);
          (d2 <= d3);
          (d1 <= d4);
          (d4 <= d3);
            */

			if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
				alert('CLASH');
				break;
			}
		}

		setAllEvents([...allEvents, newEvent]);
	}

	return (
		<div className='App'>
			<h1>Calendar</h1>
			<h2>Add New Event</h2>
			<div>
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
			</div>
			<RB
				// culture='vi'
				localizer={localizer}
				events={allEvents}
				startAccessor='start'
				endAccessor='end'
				style={{ height: 500, margin: '50px' }}
			/>
		</div>
	);
};
