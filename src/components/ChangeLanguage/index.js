import { Select, Space } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserLanguage } from '../../context/LanguageContext';
const { Option } = Select;

const ChangeLanguage = () => {
	const [t, i18n] = useTranslation();
	const { lang, SetLanguage } = UserLanguage();
	const handleChange = (lng) => {
		i18n.changeLanguage(lng);
		SetLanguage(lng);
	};
	return (
		<Select
			bordered={false}
			defaultValue={lang}
			style={{
				width: 115,
				fontFamily: 'Nunito Sans',
			}}
			onChange={handleChange}>
			<Option value='en'>English</Option>
			<Option
				value='vi'
				style={{
					fontFamily: 'Nunito Sans',
				}}>
				Tiếng Việt
			</Option>
		</Select>
	);
};
export default ChangeLanguage;
