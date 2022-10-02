import { Calendar as AntdCalender } from 'antd';
import React from 'react';
import moment from 'moment';
import 'moment/locale/vi';

moment.locales('vi');

export const Calendar = () => {
	const onPanelChange = (value, mode) => {
		console.log(value.format('YYYY-MM-DD'), mode);
	};

	return <AntdCalender onPanelChange={onPanelChange} value={moment()}/>;
};
