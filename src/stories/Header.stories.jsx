import React from 'react';

import { Header } from '../components/Header/Header';

export default {
  title: 'COMPONENTS/Header',
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const Template = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {
    name: 'Nghia Vu',
  },
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
