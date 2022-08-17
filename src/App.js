import logo from './logo.svg';
import * as React from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';

function MyComponent() {
	const { t, i18n } = useTranslation();
	const [data, setData] = React.useState(null);
	React.useEffect(() => {
		fetch('/api')
			.then((res) => res.json())
			.then((data) => setData(data.message));
	}, []);

	return (
		<div>
			<button onClick={() => i18n.changeLanguage('vn')}>de</button>
			<button onClick={() => i18n.changeLanguage('en')}>en</button>
			<h1>{t('Welcome to React')}</h1>;
			<p>{!data ? 'Loading...' : data}</p>
		</div>
	);
}

function App() {
	return <MyComponent></MyComponent>;
}

export default App;
