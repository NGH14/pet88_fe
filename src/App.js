import * as React from 'react';
import { useTranslation } from 'react-i18next';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes } from 'react-router-dom';

import { Layout } from 'antd';
import { ConfigProvider } from 'antd';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { listRoute } from './utils/routes';
import { routes } from './routes/';
import viVN from 'antd/es/locale/vi_VN';

import './index.css';
import './App.css';
import { AuthContextProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	console.log(process.env);

	return (
		<ConfigProvider locale={viVN}>
			<AuthContextProvider>
				<BrowserRouter>
					<ToastContainer
						position='top-right'
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme='light'
					/>
					<Routes>{listRoute(routes)}</Routes>
				</BrowserRouter>
			</AuthContextProvider>
		</ConfigProvider>
	);
}

export default App;
