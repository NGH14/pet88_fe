import React, { useState } from 'react';
import { storage } from '../../utils/firebase';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';

export default function AddUser() {
	const [file, setFile] = useState('');

	const handleAdd = async (e) => {
		e.preventDefault();
		// await addDoc(collection(storage, 'cities'));
		await setDoc(doc(storage, 'cities', 'dsadsadsadsad'), { test: 'test' });
	};
	return (
		<div>
			<button onClick={handleAdd}>Add</button>
		</div>
	);
}
