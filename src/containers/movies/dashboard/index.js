/**
 * @author shreyas.hande on 9/3/18
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import DashBoardCore from './core';

import Movies from '../../../utils/movies';
import Context from '../../../utils/context';

class DashBoard extends Component {

	componentDidMount() {
		Context.showLoader();
		Movies.getDashBoard();
	}

	render() {
		return (
			<div>
				<Helmet
					title="Dashboard - Movie Mania"
				/>
				<DashBoardCore
					{...this.props}
				/>
			</div>
		);
	}
}

function mapStateToProps(statesInRedux) {
	return {
		data: statesInRedux.movies.dashboard
	};
}


export default connect(mapStateToProps)(DashBoard);