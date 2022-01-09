/**
 * @author shreyas.hande on 9/8/18
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import MovieCard from './card';

const styles = theme => ({
	root: {
		flexGrow: 1,
	}
});

class MovieList extends Component {
	renderMarkup = () => (
		this.props.movieList.map((movie) => (
			<Grid
				item
				key={'movie-' + movie.id}
				xs={12}
				sm={4}
				md={3}
				lg={2}
				xl={1}
			>
				<MovieCard
					movie={movie}
				/>
			</Grid>
		))
	);

	render() {
		return (
			<div>
				<Grid container className={this.props.classes.root} spacing={16}>
					<Grid item xs={12}>
						<Grid container className={this.props.classes.demo} justify="center" spacing={16}>
							{this.renderMarkup()}
						</Grid>
					</Grid>
				</Grid>
			</div>
		);
	}
}

MovieList.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieList);