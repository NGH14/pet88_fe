import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter, Routes } from 'react-router-dom';

import { AuthContextProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import i18n from 'i18next';
import { LanguageContextProvider } from './context/LanguageContext';
import { SearchContextProvider } from './context/SearchContext';
import ListRoutes from './utils/ListRoutes';

import { routes } from './routes/';

import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import './App.css';

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
