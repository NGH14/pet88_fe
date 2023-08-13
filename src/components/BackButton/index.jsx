import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export default function BackButton() {
	const navigate = useNavigate();
	const [t, i18n] = useTranslation();

	return (
		<Button
			type='text'
			icon={<ArrowLeftOutlined />}
			onClick={() => navigate(-1)}
			style={{ color: '#F76A1A', paddingLeft: 0, marginBlock: 10 }}
		>
			${t('Back')}
		</Button>
	);
}
