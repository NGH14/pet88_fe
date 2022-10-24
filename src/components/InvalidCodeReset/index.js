import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import {
	NavLink,
	useNavigate,
	useLocation,
	useResolvedPath,
	redirect,
} from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import './style.css';
import SignInGoogle from '../SignInGoogle/index';
import { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const InValidDisplay = (state) => {
	const navigate = useNavigate();
	return (
		state && (
			<div className='invalidpage' style={{ textAlign: 'center' }}>
				<h1 className='invalidpage-heading'>
					Resetting your password again!
				</h1>
				<span className='invalidpage-subtext'>
					Your request to reset your password has expired or the link
					has already been used. Please try again!
				</span>
				<Button
					onClick={() => navigate('/forgot-password')}
					type='primary'
					htmlType='submit'
					style={{
						fontWeight: 'bold',
						fontSize: 14,
						lineHeight: 1.8,
						backgroundColor: 'RGB(109, 156, 145)',
						borderColor: 'RGB(109, 156, 145)',
						borderRadius: 50,
						boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
						marginBottom: 10,
					}}>
					BACK TO FORGOT PASSWORD
				</Button>
			</div>
		)
	);
};

export default InValidDisplay;
