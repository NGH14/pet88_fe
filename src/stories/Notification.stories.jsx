import React from 'react';

import { Notification } from './../components/Notification/';


export default {
	title: 'COMPONENTS/Notification',
	component: Notification,
	parameters: {
		layout: 'centered',
	},
	argTypes: { onClick: { action: 'closed' } },
};

const Template = (args) => <Notification {...args} />;
export const defaultToast = Template.bind({});


export const warningToast = Template.bind({});
warningToast.args = {
	types: 'warning',
};

export const informationToast = Template.bind({});
informationToast.args = {
	types: 'info',
};

export const errorToast = Template.bind({});
errorToast.args = {
	types: 'error',
};
export const successToast = Template.bind({});
successToast.args = {
	types: 'success',
};

export const darkMode = Template.bind({});
darkMode.args = {
	theme: 'dark',
};

export const coloredMode = Template.bind({});
coloredMode.args = {
	theme: 'colored',
};


