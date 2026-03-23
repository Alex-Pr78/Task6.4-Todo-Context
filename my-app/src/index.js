import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './app/app';
import { initialState } from './app/initial-state';
import { StateManager } from './state-manager';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<StateManager initialState={initialState}>
		<App />
	</StateManager>,
);
