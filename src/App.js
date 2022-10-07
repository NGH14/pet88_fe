import * as React from 'react';
import { Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { Layout } from 'antd';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import './index.css';
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
import { Calendar } from './components/Calendar/';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';
import { routers } from './routes/index';

import Login from './container/Login/';

const { Header, Footer, Sider, Content } = Layout;

export function MyComponent() {
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

function App() {
	return (
		<ConfigProvider locale={viVN}>
			<RouterProvider router={routers} />
		</ConfigProvider>
	);
}

export default App;
