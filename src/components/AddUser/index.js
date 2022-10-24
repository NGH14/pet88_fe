import React, { useState } from 'react';
import { db } from '../../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function AddUser() {
	const [file, setFile] = useState('');

	const handleAdd = async (e) => {
		e.preventDefault();
		await addDoc(collection(db, 'cities'), {
			name: 'Los Angeles',
			state: ' CA',
			country: 'USA',
		});
	};
	return (
		<div>
			<button onClick={handleAdd}>Add</button>
		</div>
	);
}
