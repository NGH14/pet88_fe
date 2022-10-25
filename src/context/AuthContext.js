import React, { useContext, createContext } from 'react';
import {
	verifyPasswordResetCode,
	sendPasswordResetEmail,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updatePassword,
	confirmPasswordReset,
	updateProfile,
	getIdToken,
} from 'firebase/auth';
import { auth, storage } from '../utils/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = React.useState();
	const [token, setToken] = React.useState('');
	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		return signInWithPopup(auth, provider);
	};
	const createUser = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const emailSignIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};
	const UpdatePassword = (password) => {
		return updatePassword(user, password);
	};
	const VerifyPasswordResetCode = (code) => {
		return verifyPasswordResetCode(auth, code);
	};

	const SignOut = () => {
		signOut(auth);
		setUser();
		localStorage.removeItem('name');
	};

	const forgotPassword = (email) => {
		return sendPasswordResetEmail(auth, email, {
			url: `http://localhost:3000/sign-in`,
		});
	};

	function ConfirmResetPassword(oobCode, newPassword) {
		return confirmPasswordReset(auth, oobCode, newPassword);
	}

	const AddUserToDB = async (user, additionalData) => {
		const docRef = doc(storage, 'users', user?.uid);
		const docSnap = await getDoc(docRef);

		if (!docSnap.exists()) {
			await setDoc(doc(storage, 'users', user?.uid), {
				createAt: new Date(),
				email: user.email,
				name: user.displayName,
				role: additionalData.role || 'user',
				...additionalData,
			});
		}
	};

	const CheckRole = async (userID) => {
		const docRef = doc(storage, 'users', userID);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return docSnap.data()?.role;
		}
	};

	const UserInfo = async (userID) => {
		const docRef = doc(storage, 'users', userID);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			localStorage.setItem('name', docSnap.data().name);
			setUser(docSnap.data());
		}
	};

	React.useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			UserInfo(currentUser.uid);
			if (currentUser) {
				CheckRole(currentUser.uid);
				currentUser.getIdToken().then(function (idToken) {
					console.log(idToken);
					setToken(idToken);
				});
			}
		});
		return () => {
			unsubscribe();
			setUser();
			localStorage.removeItem('name');
		};
	}, []);

	return (
		<AuthContext.Provider
			value={{
				CheckRole,
				user,
				AddUserToDB,
				token,
				VerifyPasswordResetCode,
				googleSignIn,
				SignOut,
				createUser,
				emailSignIn,
				forgotPassword,
				UpdatePassword,
				ConfirmResetPassword,
				updateProfile,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(AuthContext);
};
