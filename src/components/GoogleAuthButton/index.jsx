import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

const GoogleAuthButton = () => {
	const { user, SignOut } = UserAuth();

	const handleSignOut = async () => {
		try {
			await SignOut();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='flex justify-between bg-gray-200 w-full p-4'>
			<h1 className='text-center text-2xl font-bold'>
				 {user && `hi ${user?.displayName}`}
			</h1>
			{user ? (
				<button onClick={handleSignOut}>Logout</button>
			) : (
				<Link to='/auth'>Sign in</Link>
			)}
		</div>
	);
};

export default GoogleAuthButton;
