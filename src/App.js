import * as React from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes } from 'react-router-dom';

import { Layout } from 'antd';
import { ConfigProvider } from 'antd';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { routes } from './routes/';
import viVN from 'antd/es/locale/vi_VN';

import './index.css';
import './App.css';
import { AuthContextProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import i18n from 'i18next';
import { LanguageContextProvider } from './context/LanguageContext';
import { SearchContextProvider } from './context/SearchContext';
import ListRoutes from './utils/ListRoutes';

function App() {
	return (
		<AuthContextProvider>
			<LanguageContextProvider>
				<I18nextProvider i18n={i18n}>
					<SearchContextProvider>
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
							<Routes>{ListRoutes(routes)}</Routes>
						</BrowserRouter>
					</SearchContextProvider>
				</I18nextProvider>
			</LanguageContextProvider>
		</AuthContextProvider>
	);
}

export default App;
