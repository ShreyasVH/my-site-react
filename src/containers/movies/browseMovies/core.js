/**
 * @author shreyas.hande on 9/8/18
 *
 */

import React, { Component } from 'react';
import Waypoint from 'react-waypoint';

import MovieList from '../movieList/index';
import Filters from '../../filters';
import SearchDropDown from '../../../components/searchDropdown';

export default class BrowseMoviesCore extends Component {
	renderTitle = () => {
		if (!this.props.isEmpty()) {
			return (
				<h1
					className="title"
				>
					Browse Movies
				</h1>
			);
		}
	};

	renderCount = () => {
		if (!this.props.isEmpty()) {
			return (
				<h3>
					{this.props.totalCount + ' movies'}
				</h3>
			);
		}
	};

	handleSearch = event => this.props.onSearch && this.props.onSearch(event);

	renderSearchDropdown = () => {
		return (
			<SearchDropDown
				onKeyUp={this.handleSearch}
				items={this.props.suggestions}
			/>
		);
	};

	renderWaypoint = () => {
		if (!this.props.isEmpty()) {
			return (
				<Waypoint
					onEnter={this.props.onScroll}
				/>
			);
		}
	};

	openFilters = (event) => this.props.onFilterOpen && this.props.onFilterOpen(event);

	closeFilters = (event) => this.props.onFilterClose && this.props.onFilterClose(event);

	applyFilters = () => this.props.applyFilters && this.props.applyFilters();

    clearFilters = (event) => this.props.clearFilters && this.props.clearFilters(event);

    clearFilter = (key) => this.props.clearFilter && this.props.clearFilter(key);

	renderFilter = () => {
		return (
			<Filters
				isOpen={this.props.isFilterOpen}
				selected={this.props.selectedFilters}
				options={this.props.filterOptions}
				onFilterOpen={this.openFilters}
				onFilterClose={this.closeFilters}
				handleEvent={this.props.handleEvent}
				applyFilters={this.applyFilters}
                clearFilters={this.clearFilters}
                clearFilter={this.clearFilter}
			/>
		);
	};

	renderMovieList = () => {
		return (
			<MovieList
				{...this.props}
			/>
		);
	};

	renderMarkup = () => {
		let markup = [];
		if (!this.props.isEmpty()) {
			markup = (
				<div>
					{this.renderFilter()}
					{this.renderTitle()}
					{this.renderCount()}
					{this.renderSearchDropdown()}
					{this.renderMovieList()}
					{this.renderWaypoint()}
				</div>
			);
		}
		return markup;
	};

	render() {
		return (
			<div>
				{this.renderMarkup()}
			</div>
		);
	}
}
