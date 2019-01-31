/**
 * @author shreyas.hande on 9/8/18
 *
 */

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import BrowseMoviesCore from './core';
import Movies from '../../../utils/movies';
import Context from '../../../utils/context';

class BrowseMovies extends Component {
	componentDidMount() {
		Context.showLoader();
		Movies.updateFilters();
		Movies.getMoviesWithFilters();
	}

	componentWillUnmount() {
		Movies.clearList();
	}

	handleScroll = () => {
		Context.showLoader();
		Movies.getMoviesWithFilters(false);
	};

	isLoadComplete = () => (this.props.totalCount === this.props.movieList.length);

	isEmpty = () => (-1 === this.props.totalCount);

	render() {
		return (
			<div>
				<Helmet
					title="Browse Movies - Movie Mania"
				/>
				<BrowseMoviesCore
					{...this.props}
					onScroll={this.handleScroll}
					isLoadComplete={this.isLoadComplete}
					isEmpty={this.isEmpty}
				/>
			</div>
		);
	}
}

function mapStateToProps (statesInRedux) {
	return {
		movieList: statesInRedux.movies.list,
		totalCount: statesInRedux.movies.totalCount
	};
}

export default connect(mapStateToProps)(BrowseMovies);