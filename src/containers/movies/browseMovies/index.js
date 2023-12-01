/**
 * @author shreyas.hande on 9/8/18
 *
 */

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import BrowseMoviesCore from './core';

import Movies from '../../../utils/movies';
import Filters from '../../../utils/filters';
import Context from '../../../utils/context';
import MovieFilterHandler from '../../../utils/movies/filterHandler';

class BrowseMovies extends Component {
	componentDidMount() {
		Context.showLoader();
		Movies.updateFilters();
		Filters.resetTempFilters('movies');
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
		Filters.openFilters('movies');
	};

	closeFilters = (event) => {
		event.preventDefault();
		Filters.closeFilters('movies');
		Filters.resetTempFilters('movies');
	};

	applyFilters = () => {
		Context.showLoader();
		Filters.applyFilters('movies');
		Movies.getMoviesWithFilters();
	};

	clearFilters = event => {
		Filters.clearFilters('movies');
	};

	clearFilter = key => {
		Filters.clearFilter('movies', key);
	};

	handleEvent = event => MovieFilterHandler.handleEvent('movies', event);

	handleSearch = event => {
		Movies.getSuggestions(event);
	};

	handleSearchClick = selectedId => {
		window.location.href = ('/movies/movieDetail?id=' + selectedId);
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
					handleEvent={this.handleEvent}
					applyFilters={this.applyFilters}
					clearFilters={this.clearFilters}
					clearFilter={this.clearFilter}
					onSearch={this.handleSearch}
					onSearchClick={this.handleSearchClick}
				/>
			</div>
		);
	}
}

function mapStateToProps (store) {
	return {
		movieList: store.movies.list,
		totalCount: store.movies.totalCount,
		selectedFilters: store.movies.filtersTemp,
		isFilterOpen: store.movies.isFilterOpen,
		filterOptions: store.movies.filterOptions,
		suggestions: store.movies.suggestions
	};
}

export default connect(mapStateToProps)(BrowseMovies);
