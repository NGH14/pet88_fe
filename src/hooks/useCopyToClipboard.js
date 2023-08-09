import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { message } from 'antd';

export default function useCopyToClipboard() {
	const [value, setValue] = useState();
	const [success, setSuccess] = useState();

	const successMessage = () => {
		message.success('Copied to clipboard');
	};
	const copyToClipboard = (text, options) => {
		const result = copy(text, options);
		if (result) setValue(text);
		setSuccess(result);
		successMessage();
	};

	return [copyToClipboard, { value, success }];
}
