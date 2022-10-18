import * as React from 'react';

import moment from 'moment';
import { motion, AnimatePresence } from 'framer-motion';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

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

import { Calendar } from '../../components/Calendar';
import GoogleAuthButton from '../../components/GoogleAuthButton/';
import { UserLanguage } from '../../context/LanguageContext';
import { momentLocalizer } from 'react-big-calendar';
// translation catalog

// initialize i18next with catalog and language to use

function Homepage() {
	const [data, setData] = React.useState(null);
	const [t, i18n] = useTranslation();
	const { lang, SetLanguage } = UserLanguage();

	// React.useEffect(() => {
	// 	fetch('/api')
	// 		.then((res) => res.json())
	// 		.then((data) => setData(data.message));
	// }, []);
	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
		SetLanguage(lng);
	};

	return (
		<ConfigProvider locale={lang === 'vi' && viVN}>
			<div>
				<GoogleAuthButton />
				<div className='example'>
					<button onClick={() => changeLanguage('en')}>en</button>
					<button onClick={() => changeLanguage('vi')}>vi</button>
					<h1>{t('Welcome to React')}</h1>
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
		</ConfigProvider>
	);
}
export default Homepage;
