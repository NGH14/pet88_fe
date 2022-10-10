import * as React from 'react';
import { useTranslation } from 'react-i18next';
import ReactDOM from 'react-dom/client';
import {
	BrowserRouter,
	createBrowserRouter,
	RouterProvider,
	Route,
	Routes,
} from 'react-router-dom';
import { listRoute } from './utils/routes';
import './index.css';

import { Layout } from 'antd';
import { ConfigProvider } from 'antd';
import viVN from 'antd/es/locale/vi_VN';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';
import { routes } from './routes/';

const { Header, Footer, Sider, Content } = Layout;

function App() {
	return (
		<ConfigProvider locale={viVN}>
			<BrowserRouter>
				<Routes>{listRoute(routes)}</Routes>
			</BrowserRouter>
		</ConfigProvider>
	);
}

export default App;
