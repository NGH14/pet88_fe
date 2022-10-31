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
import {
	doc,
	getDoc,
	setDoc,
	updateDoc,
	getDocs,
	collection,
	deleteDoc,
	Timestamp,
} from 'firebase/firestore';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = React.useState();
	const [firebaseAuthUser, setFireBaseAuthUser] = React.useState({});

	const [token, setToken] = React.useState('');
	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		return signInWithPopup(auth, provider);
	};
	const createUser = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const updateUser = async (uid, name, dob, gender, phone) => {
		const userRef = doc(storage, 'users', uid);
		return await updateDoc(userRef, {
			name,
			dob,
			gender,
			phone,
		});
	};

	const updateUserByAdmin = async (uid, value) => {
		const userRef = doc(storage, 'users', uid);
		const cusdob = Timestamp.fromDate(new Date(value.dob));

		const { dob, ...rest } = value;
		console.log(cusdob);
		return await updateDoc(userRef, {
			dob: cusdob,
			...rest,
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
			return setDoc(doc(storage, 'users', user?.uid), {
				createAt: new Date(),
				id: user.uid,
				email: user.email,
				dob: user.dob || new Date(0),
				gender: user.gender || null,
				photoURL: user.photoURL,
				phone: user?.phone || null,
				name: user.displayName,
				tag: user.tag || [],
				role: additionalData.role || 'user',
				...additionalData,
			});
		}
	};

	const AddUserToDBByAdmin = async (uid, additionalData) => {
		console.log(uid, additionalData);
		const docRef = await doc(storage, 'users', uid);
		const docSnap = await getDoc(docRef);
		const cusdob = Timestamp.fromDate(new Date(additionalData.dob));

		const { dob, ...rest } = additionalData;
		if (!docSnap.exists()) {
			return setDoc(doc(storage, 'users', uid), {
				createAt: new Date(),
				id: uid,
				email: additionalData.email,
				dob: cusdob || new Date(0),
				gender: additionalData.gender || null,
				phone: additionalData?.phone || null,
				name: additionalData.displayName,
				tag: additionalData.tag || [],
				role: additionalData.role || 'user',
				...rest,
			});
		}
	};

	const GetAllUser = async () => {
		return await getDocs(collection(storage, 'users'));
	};

	const DeleteUser = async (id) => {
		return await deleteDoc(doc(storage, 'users', id));
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
				AddUserToDBByAdmin,
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
				GetAllUser,
				ConfirmResetPassword,
				updateProfile,
				updateUserByAdmin,
				DeleteUser,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(AuthContext);
};
