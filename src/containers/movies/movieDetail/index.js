/**
 * @author shreyas.hande on 9/9/18
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import MovieDetailCore from './core';

import Movie from '../../../utils/movies';
import Context from '../../../utils/context';
import Utils from '../../../utils';

class MovieDetail extends Component {
	componentDidMount() {
		Context.showLoader();
		Movie.loadMovieDetails(Utils.getUrlParam('id'));
	}

	componentWillUnmount() {
		Movie.clearMovieDetails();
	}

	handleUpdateClick = () => {
		this.props.history.push('/movies/update?id=' + this.props.movie.id);
	}

	isEmpty = () => (0 === Object.keys(this.props.movie).length);

	getPageTitle = () => ((this.isEmpty()) ? 'Movie Mania' : (this.props.movie.name + ' - Movie Mania'));

	render() {
		return (
			<div>
				<Helmet
					title={this.getPageTitle()}
				/>
				<MovieDetailCore
					{...this.props}
					isEmpty={this.isEmpty}
					onUpdateClick={this.handleUpdateClick}
				/>
			</div>
		);
	}
}

function mapStateToProps(statesInRedux) {
	return {
		movie: statesInRedux.movies.individual
	};
}

export default connect(mapStateToProps)(MovieDetail);