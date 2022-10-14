/**
 * @author shreyas.hande on 9/9/18
 *
 */

import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
	paper: {
		height: 180,
		width: 135,
		marginLeft: 'auto',
		marginRight: 'auto',
		[theme.breakpoints.up('sm')]: {
			height: 304,
			width: 228
		},
		[theme.breakpoints.up('md')]: {
			height: 308,
			width: 231
		},
		[theme.breakpoints.up('lg')]: {
			height: 288,
			width: 216
		},
		[theme.breakpoints.up('xl')]: {
			height: 520,
			width: 390
		}
	},
	movieImage: {
		height: 180,
		width: 135,
		[theme.breakpoints.up('sm')]: {
			height: 304,
			width: 228
		},
		[theme.breakpoints.up('md')]: {
			height: 308,
			width: 231
		},
		[theme.breakpoints.up('lg')]: {
			height: 288,
			width: 216
		},
		[theme.breakpoints.up('xl')]: {
			height: 520,
			width: 390
		}
	},
	movieLink: {
		textAlign: 'center',
		// width: '180px',
		marginTop: '10px'
	},
	cardWrapper: {
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: '15px',
		marginBottom: '15px'
	},
	link: {
		fontWeight: 'bold',
		textDecoration: 'none',
		color: '#35A4F5'
	}
});

class MovieCard extends Component {
	renderLink = () => {
		let { movie, showLink = true } = this.props;
		if (showLink) {
			return (
				<div className={this.props.classes.movieLink}>
					<Link
						to={'/movies/movieDetail?id=' + movie.id}
					>
						<span className={this.props.classes.link}>
							{movie.name}
						</span>
					</Link>
				</div>
			);
		}
	};

	render() {
		let { movie } = this.props;
		return (
			<div className={this.props.classes.cardWrapper}>
				<Paper
					className={this.props.classes.paper}
				>
					<img
						className={this.props.classes.movieImage}
						src={movie.imageUrl}
						alt={movie.name}
					/>
				</Paper>
				{this.renderLink()}
			</div>
		);
	}
}

MovieCard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieCard);