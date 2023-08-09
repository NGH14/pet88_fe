import React from 'react';
import { useTranslation } from 'react-i18next';
import img from '../../assets/images/undraw_bug_fixing_oc7a (1).png';
import './style.css';
import { NavLink } from 'react-router-dom';

export default function UnderDev() {
	const { t } = useTranslation();
	return (
		<>
			<div className='underpage'>
				<div className='underpage-form'>
					<img src={img} alt='' style={{ height: 200 }} />
					<h1
						style={{
							fontWeight: 700,
							margin: 15,
							textTransform: 'capitalize',
						}}
					>
						{t('Site under construction and maintenance')}
					</h1>

					<p>
						{t(
							'Sorry about this inconvenience, please come back later',
						)}
					</p>

					<NavLink to={'/'}>Go Back</NavLink>
				</div>
			</div>
		</>
	);
}
