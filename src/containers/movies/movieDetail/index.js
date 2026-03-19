/**
 * @author shreyas.hande
 */

import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import MovieDetailCore from './core';

import Movie from '../../../utils/movies';
import Context from '../../../utils/context';
import Utils from '../../../utils';
import { useNavigate } from 'react-router-dom';

const MovieDetail = (props) => {

	const navigate = useNavigate();

	useEffect(() => {
		Context.showLoader();
		Movie.loadMovieDetails(Utils.getUrlParam('id'));

		return () => {
			Movie.clearMovieDetails();
		};
	}, []);

	const handleUpdateClick = () => {
		navigate(`/movies/update?id=${props.movie.id}`);
	}

	const isEmpty = useCallback(() => {
		return Object.keys(props.movie).length === 0;
	}, [props.movie]);

	const getPageTitle = () => {
		return isEmpty()
			? 'Movie Mania'
			: `${props.movie.name} - Movie Mania`;
	};

	return (
		<div>
			<Helmet
				title={getPageTitle()}
			/>
			<MovieDetailCore
				{...props}
				isEmpty={isEmpty}
				onUpdateClick={handleUpdateClick}
			/>
		</div>
	);
};

function mapStateToProps(statesInRedux) {
	return {
		movie: statesInRedux.movies.individual
	};
}

export default connect(mapStateToProps)(MovieDetail);