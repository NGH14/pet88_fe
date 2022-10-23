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
import { auth } from '../utils/firebase';
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = React.useState({});
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
	};

	const forgotPassword = (email) => {
		return sendPasswordResetEmail(auth, email, {
			url: `http://localhost:3000/sign-in`,
		});
	};

	function ConfirmResetPassword(oobCode, newPassword) {
		return confirmPasswordReset(auth, oobCode, newPassword);
	}

	React.useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			if (currentUser) {
				currentUser.getIdToken().then(function (idToken) {
					// <------ Check this line
					console.log(idToken); // It shows the Firebase token now
					setToken(idToken);
				});
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
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
