/**
 * @author shreyas.hande on 9/9/18
 *
 */

import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';

import './styles.css';

class Loader extends Component {
	render() {
		let markup;
		if (this.props.showLoader) {
			markup = (
				<div className="loader">
					<CircularProgress
					/>
				</div>
			);
		} else {
			markup = (<div />);
		}
		return markup;
	}
}

function mapStateToProps(statesInRedux) {
	return {
		showLoader: statesInRedux.context.showLoader
	};
}

export default connect(mapStateToProps)(Loader);