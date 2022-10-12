// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAI1M8hNAY_W_bnowI6wUIwKCyjTQjdPAw',
	authDomain: 'pet88-35fa9.firebaseapp.com',
	projectId: 'pet88-35fa9',
	storageBucket: 'pet88-35fa9.appspot.com',
	messagingSenderId: '884025799576',
	appId: '1:884025799576:web:e187fffc83bd397619f1ed',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
