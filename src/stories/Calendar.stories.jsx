import { Basic, Selectable, DragAndDrop } from './../components/Calendar/index';
import moment from 'moment';
import {
	Calendar,
	Views,
	DateLocalizer,
	momentLocalizer,
} from 'react-big-calendar';

export default {
	title: 'COMPONENTS/Calendar',
	component: Calendar,
	parameters: {
		docs: {
			page: null,
		},
	},
};

const localizer = momentLocalizer(moment);

export function BasicCalendar() {
	return <Basic localizer={localizer} />;
}

BasicCalendar.storyName = 'Basic';

export function SelectableCalendar() {
	return <Selectable localizer={localizer} />;
}

SelectableCalendar.storyName = 'Selectable';

export function DnDCalendar() {
	return <DragAndDrop localizer={localizer} />;
}

DnDCalendar.storyName = 'Drag and Drop';
