/**
 * @author shreyas.hande on 9/8/18
 *
 */

import React, { Component } from 'react';
import Waypoint from 'react-waypoint';

import MovieList from '../movieList/index';
import Filters from '../../filters';

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

	renderFilter = () => {
		return (
			<Filters
				isOpen={this.props.isFilterOpen}
                filters={this.props.filters}
				selected={this.props.selectedFilters}
				options={this.props.filterOptions}
				onFilterOpen={this.openFilters}
				onFilterClose={this.closeFilters}
				handleEvent={this.props.handleEvent}
				applyFilters={this.props.applyFilters}
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
					<MovieList
						{...this.props}
					/>
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
