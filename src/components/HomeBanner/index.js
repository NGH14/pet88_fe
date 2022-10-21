import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';
// import Banner from '../../assets/images/';

const HomeBannerStyles = styled.div`
	display: relative;
	border-radius: 36px;
	min-height: 600px;
	padding: 40px 0;
	background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)),
		url('https://dog-jogs.ca/wp-content/uploads/2017/08/Summer-Header.jpg')
			no-repeat right top;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;

	background-color: #cccccc;
	.banner {
		padding: 20px;

		display: flex;
		justify-content: center;
		align-items: center;
		&-content {
			max-width: 600px;
			color: white;
		}
		&-heading {
			color: white;

			font-size: 36px;
			margin-bottom: 20px;
			font-weight: bold;
		}
		&-desc {
			line-height: 1.75;
			margin-bottom: 40px;
		}
	}
	@media screen and (max-width: 1023.98px) {
		.banner {
			padding: 15px;

			flex-direction: column;
			min-height: unset;
			&-heading {
				font-size: 30px;
			}
			&-desc {
				font-size: 14px;
				margin-bottom: 20px;
			}
			&-image {
			}
			&-button {
				font-size: 14px;
				height: auto;
				padding: 15px;
			}
		}
	}

	@media screen and (max-width: 650px) {
		.banner {
			&-image {
				display: none;
			}
		}
	}
`;

const HomeBanner = () => {
	return (
		<HomeBannerStyles>
			<div className='container'>
				<div className='banner'>
					<div className='banner-content'>
						<h1 id='banner' className='banner-heading'>
							Monkey Blogging
						</h1>
					</div>
				</div>
			</div>
		</HomeBannerStyles>
	);
};

export default HomeBanner;
