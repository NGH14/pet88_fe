import React from 'react';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import './style.css';
import { useTranslation } from 'react-i18next';
import dogImg from '../../assets/images/Summer-Header.jpg';

const HeroBlockStyled = styled.div`
	background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)),
		url(${dogImg}) no-repeat center center;
	width: 100%;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
`;

function HeroImage() {
	const [t] = useTranslation();
	return (
		<HeroBlockStyled id='hero' className='heroBlock'>
			<div className='content'>
				<h3 className='content-title'>
					{t('established & trusted pet care service')}
				</h3>
				<div className='content-form'>
					<Form
						name='basic'
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						initialValues={{ remember: true }}
						// onFinish={onFinish}
						// onFinishFailed={onFinishFailed}
						autoComplete='off'>
						<Form.Item
							label='Username'
							name='username'
							rules={[
								{
									required: true,
									message: 'Please input your username!',
								},
							]}>
							<Input />
						</Form.Item>
					</Form>
				</div>
			</div>
		</HeroBlockStyled>
	);
}

export default HeroImage;
