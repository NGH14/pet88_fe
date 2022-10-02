import * as React from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import { Card } from 'antd';
import { Layout } from 'antd';

import moment from 'moment';

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
} from 'antd';
// import 'moment/locale/vi-VN';

import viVN from 'antd/es/locale/vi_VN';
import enUS from 'antd/es/locale/en_US';
import Test from './Test';
import { Calendar } from './components/Calendar/';

const { Header, Footer, Sider, Content } = Layout;

function MyComponent() {
	const { t, i18n } = useTranslation();
	const [data, setData] = React.useState(null);
	React.useEffect(() => {
		console.log(process.env);
		fetch('/api')
			.then((res) => res.json())
			.then((data) => setData(data.message));
	}, []);

	return (
		<div>
			{/* <Layout>
				<Sider>Sider</Sider>
				<Layout>
					<Header>Header</Header>
					<Content>Content</Content>
					<Footer>Footer</Footer>
				</Layout>
			</Layout> */}
			<ConfigProvider locale={viVN}>
				<div className='example'>
					<Pagination defaultCurrent={1} total={50} showSizeChanger />
				</div>

				<TimePicker />
				<Calendar></Calendar>
				<h1>{t('Welcome to React')}</h1>
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
			</ConfigProvider>
		</div>
	);
}

function App() {
	return <MyComponent></MyComponent>;
}

export default App;
