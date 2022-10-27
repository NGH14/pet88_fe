import React, { useContext, createContext } from 'react';
import {
	reauthenticateWithCredential,
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
	EmailAuthProvider,
} from 'firebase/auth';
import { auth, storage } from '../utils/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { async } from '@firebase/util';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = React.useState();
	const [credential, setCredential] = React.useState();
	console.log(credential);
	const [firebaseAuthUser, setFireBaseAuthUser] = React.useState({});

	const [token, setToken] = React.useState('');
	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		return signInWithPopup(auth, provider);
	};
	const createUser = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const updateUser = async (uid, name) => {
		const userRef = doc(storage, 'users', uid);
		return await updateDoc(userRef, {
			name,
		});
	};

	const emailSignIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};
	const UpdatePassword = async (oldPassword, password) => {
		const credential = EmailAuthProvider.credential(
			user.email,
			oldPassword,
		);

		console.log({ credential });
		await reauthenticateWithCredential(auth.currentUser, credential);

		return updatePassword(firebaseAuthUser, password);
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
		const docRef = await doc(storage, 'users', user?.uid);
		const docSnap = await getDoc(docRef);

		if (!docSnap.exists()) {
			return await setDoc(doc(storage, 'users', user?.uid), {
				createAt: new Date(),
				id: user.uid,
				email: user.email,
				photoURL: user.photoURL,
				number: user?.number || null,
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
			setUser(docSnap.data());
			localStorage.setItem('name', docSnap.data().name);
		}
	};

	React.useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setFireBaseAuthUser(currentUser);
			if (currentUser) {
				UserInfo(currentUser?.uid);
				CheckRole(currentUser?.uid);
				currentUser.getIdToken().then(function (idToken) {
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
				UpdatePassword,
				updateUser,
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
