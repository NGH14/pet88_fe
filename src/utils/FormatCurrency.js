function ToVND(num) {
	return new Intl.NumberFormat('vi-VI', {
		style: 'currency',
		currency: 'VND',
	}).format(num);
}

function ToUSD(num) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(num);
}

export { ToVND, ToUSD };
