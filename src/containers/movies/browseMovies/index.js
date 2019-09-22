/**
 * @author shreyas.hande on 9/8/18
 *
 */

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import BrowseMoviesCore from './core';

import { FILTER_TYPE } from '../../../constants';
import Movies from '../../../utils/movies';
import Context from '../../../utils/context';
import MovieFilterHandler from '../../../utils/movies/filterHandler';

class BrowseMovies extends Component {
	componentDidMount() {
		Context.showLoader();
		Movies.updateFilters();
		Movies.resetTempFilters();
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

	openFilters = (event) => {
		event.preventDefault();
		Movies.openFilters();
	};

	closeFilters = (event) => {
		event.preventDefault();
		Movies.closeFilters();
		Movies.resetTempFilters();
	};

	applyFilters = () => {
		Context.showLoader();
		Movies.applyFilters();
		Movies.getMoviesWithFilters();
	};

	clearFilters = event => {
		Movies.clearFilters();
	};

	clearFilter = key => {
		Movies.clearFilter(key);
	};

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
					onFilterOpen={this.openFilters}
					onFilterClose={this.closeFilters}
					handleEvent={MovieFilterHandler.handleEvent}
					applyFilters={this.applyFilters}
					clearFilters={this.clearFilters}
					clearFilter={this.clearFilter}
				/>
			</div>
		);
	}
}

function mapStateToProps (statesInRedux) {
	return {
		movieList: statesInRedux.movies.list,
		totalCount: statesInRedux.movies.totalCount,
		selectedFilters: statesInRedux.movies.filtersTemp,
		isFilterOpen: statesInRedux.movies.isFilterOpen,
		filterOptions: statesInRedux.movies.filterOptions,
	};
}

export default connect(mapStateToProps)(BrowseMovies);
