/**
 * @author shreyas.hande on 9/8/18
 *
 */

import React, { Component } from 'react';
import Waypoint from 'react-waypoint';

import MovieList from '../movieList/index';

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

	renderMarkup = () => {
		let markup = [];
		if (!this.props.isEmpty()) {
			markup = (
				<div>
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