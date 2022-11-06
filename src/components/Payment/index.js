import axios from 'axios';

const Payment = () => {
	const handleCheckout = () => {
		axios
			.post(`http://localhost:3001/create-checkout-session`, {
				email: 'vuhuunghia',
			})
			.then((response) => {
				console.log(response);
				// window.location.href = response.data.url;
			})
			.catch((err) => console.log(err.message));
	};

	return (
		<>
			<button onClick={() => handleCheckout()}>Check out</button>
		</>
	);
};

export default Payment;
