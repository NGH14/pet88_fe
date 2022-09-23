import * as React from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import { Card } from 'antd';

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
			<button onClick={() => i18n.changeLanguage('vn')}>de</button>
			<button onClick={() => i18n.changeLanguage('en')}>en</button>
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
		</div>
	);
}

function App() {
	return <MyComponent></MyComponent>;
}

export default App;
