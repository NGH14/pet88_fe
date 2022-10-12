import './style.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import React from 'react';

const antIcon = (
	<LoadingOutlined
		style={{
			fontSize: 75,
			color: '#F76A1A',
		}}
		spin
	/>
);

function LoadingSpinner(props) {
	const { inputHeight } = props;
	return (
		<div
			className='loading_page'
			style={{ height: inputHeight ? inputHeight : '100vh' }}>
			<div className='loading_content'>
				<Spin indicator={antIcon} />
			</div>
		</div>
	);
}
export default React.memo(LoadingSpinner);
