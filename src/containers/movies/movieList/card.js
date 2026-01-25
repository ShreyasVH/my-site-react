/**
 * @author shreyas.hande on 9/9/18
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@mui/material';
import {styled} from "@mui/system";

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

const Container = styled("div")(({ theme }) => ({
	'.paper': {
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
	'.movieImage': {
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
	'.movieLink': {
		textAlign: 'center',
		// width: '180px',
		marginTop: '10px'
	},
	'.cardWrapper': {
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: '15px',
		marginBottom: '15px'
	},
	'.link': {
		fontWeight: 'bold',
		textDecoration: 'none',
		color: '#35A4F5'
	}
}));

class MovieCard extends Component {
	renderLink = () => {
		let { movie, showLink = true } = this.props;
		if (showLink) {
			return (
				<div className="movieLink">
					<Link
						to={'/movies/movieDetail?id=' + movie.id}
					>
						<span className="link">
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
			<Container>
				<div className="cardWrapper">
					<Paper
						className="paper"
					>
						<img
							className="movieImage"
							src={movie.imageUrl}
							alt={movie.name}
						/>
					</Paper>
					{this.renderLink()}
				</div>
			</Container>
		);
	}
}

MovieCard.propTypes = {
	classes: PropTypes.object.isRequired
};

// export default withStyles(styles)(MovieCard);
export default MovieCard;