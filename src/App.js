import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Loader from './components/loader';
import Notify from './components/notify';
import Context from "./utils/context";
import Utils from "./utils";
import store from './store';
import router from './routes';
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import themes from './themes';

class App extends Component {
	componentDidMount() {
		// window.addEventListener('resize', this.onResize.bind(this));
	}

	// onResize = (event) => {
	// 	let storeValues = store.getState();
	// 	let previousIsMobile = storeValues.context.isMobile;
	// 	let newIsMobile = Utils.isMobile(window.innerWidth);
	//
	// 	if (newIsMobile !== previousIsMobile) {
	// 		Context.updateContext({
	// 			isMobile: newIsMobile
	// 		});
	// 	}
	// }

	render() {
		return (
			<ThemeProvider theme={themes}>
				<RouterProvider router={router} />
				<Loader />
				<Notify />
			</ThemeProvider>
		);
	}
}

export default App;
