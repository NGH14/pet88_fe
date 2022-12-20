import Basic from './../components/Calendar/index';
import moment from 'moment';
import {
	Calendar,
	Views,
	DateLocalizer,
	momentLocalizer,
} from 'react-big-calendar';

export default {
	title: 'Examples',
	component: Calendar,
	parameters: {
		docs: {
			page: null,
		},
	},
};

const localizer = momentLocalizer(moment);

export function Example1() {
	return <Basic localizer={localizer} />;
}
Example1.storyName = 'Basic Demo';
