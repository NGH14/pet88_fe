import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

export default function BackButton() {
	const navigate = useNavigate();

	return (

		<Button
			type='text'
			
			icon={<ArrowLeftOutlined />}
			onClick={() => navigate(-1)}
			style={{ color: "#F76A1A", paddingLeft: 0, marginBlock: 10}}>
			Back
		</Button>
	);
}
