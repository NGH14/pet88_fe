import React from 'react';

import { Toastify } from './../components/Toastify/';

export default {
	title: 'COMPONENTS/Notification',
	component: Toastify,
	parameters: {
		layout: 'centered',
	},
	argTypes: { onClick: { action: 'closed' } },
};

const Template = (args) => <Toastify {...args} />;
export const defaultToast = Template.bind({});


defaultToast.story = {
  parameters: {
         design: {
            type: 'figma',
            url: 'https://www.figma.com/file/uV4Pu1Aur6dWLs3BjAeIaL/Pet88?node-id=118%3A96'
         }
      }
   }    




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
