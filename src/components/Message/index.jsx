

import { Button as AntdButton, message as antdMessage } from 'antd';

import { Button } from './../Button/';
import React from 'react';

const info = () => {
    antdMessage.info('This is a normal message');
};

export const Message = () => (
  <AntdButton type="primary" onClick={info}>
    Display normal message
  </AntdButton>
);

