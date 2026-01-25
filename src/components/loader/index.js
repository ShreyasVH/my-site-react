/**
 * @author shreyas.hande on 9/9/18
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import './styles.css';

import { CircularProgress, Dialog, Button } from '@mui/material';
import { useState } from "react";

export default function Loader (props) {
	const [ visible, setVisible ] = useState(false);

	window.addEventListener('show-loader', function(event) {
		setVisible(true);
	});

	window.addEventListener('hide-loader', function(event) {
		setVisible(false);
	});

	const showLoader = (event) => {
		event.preventDefault();

		const myEvent = new CustomEvent('show-loader', {});
		window.dispatchEvent(myEvent);
	};

	const hideLoader = (event) => {
		event.preventDefault();

		const myEvent = new CustomEvent('hide-loader', {});
		window.dispatchEvent(myEvent);
	};

	return (
		<>
			{
				visible && <div onClick={hideLoader}>
					<Dialog open={true} PaperProps={{sx: {backgroundColor: 'transparent', boxShadow: 'none'}}} >
						<CircularProgress />
					</Dialog>
				</div>
			}
		</>
	);
}

// function mapStateToProps(statesInRedux) {
// 	return {
// 		showLoader: statesInRedux.context.showLoader
// 	};
// }
//
// export default connect(mapStateToProps)(Loader);