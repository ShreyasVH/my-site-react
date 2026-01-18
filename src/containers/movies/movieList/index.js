/**
 * @author shreyas.hande on 9/8/18
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import { styled } from '@mui/system';
import { Grid } from '@mui/material';

import MovieCard from './card';

const Container = styled("div")(({ theme }) => ({
	'.root': {
		flexGrow: 1,
	}
}));

class MovieList extends Component {
	renderMarkup = () => (
		this.props.movieList.map((movie) => (
			<Grid
				key={'movie-' + movie.id}
				xs={12}
				sm={4}
				md={3}
				lg={2}
				xl={2}
				size={{xs: 12, sm: 4, md: 3, lg: 2, xl: 2}}
			>
				<MovieCard
					movie={movie}
				/>
			</Grid>
		))
	);

	render() {
		return (
			<Container>
				<Grid container className="root" spacing={16}>
					<Grid size={{xs: 12}}>
						<Grid container justify="center" spacing={3}>
							{this.renderMarkup()}
						</Grid>
					</Grid>
				</Grid>
			</Container>
		);
	}
}

MovieList.propTypes = {
	classes: PropTypes.object.isRequired
};

// export default withStyles(styles)(MovieList);
export default MovieList;