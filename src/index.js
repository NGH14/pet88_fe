/** @format */

import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n';
import App from './App';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

// append app to dom
const root = createRoot(document.getElementById('root'));
root.render(<App />);
