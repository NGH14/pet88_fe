import * as React from 'react';

import moment from 'moment';
import { motion, AnimatePresence } from 'framer-motion';

import {
	Button,
	ConfigProvider,
	DatePicker,
	Modal,
	Pagination,
	Popconfirm,
	Radio,
	Select,
	Table,
	TimePicker,
	Transfer,
	Card,
} from 'antd';

import viVN from 'antd/es/locale/vi_VN';
import enUS from 'antd/es/locale/en_US';
import { Calendar } from '../../components/Calendar';
import GoogleAuthButton from '../../components/GoogleAuthButton/';

function Homepage() {
	const [data, setData] = React.useState(null);

	React.useEffect(() => {
		fetch('/api')
			.then((res) => res.json())
			.then((data) => setData(data.message));
	}, []);

	return (
		<div>
			<GoogleAuthButton />
			<div className='example'>
				<Pagination defaultCurrent={1} total={50} showSizeChanger />
			</div>

			<TimePicker />
			<Calendar></Calendar>
			<p>{!data ? 'Loading...' : data}</p>
			<p>{!data ? 'Loading...' : data}</p>
			<Card
				size='small'
				title='Small size card'
				extra={<a href='#'>More</a>}
				style={{ width: 300 }}>
				<p>Card content</p>
				<p>Card content</p>
				<p>Card content</p>
			</Card>
		</div>
	);
}
export default Homepage;
