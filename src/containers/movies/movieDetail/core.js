/**
 * @author shreyas.hande on 9/9/18
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import MovieCard from '../movieList/card';

import Utils from '../../../utils';

import { Grid, Button } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import {styled} from "@mui/system";

const styles = theme => ({
	paper: {
		height: 80,
		width: 60,
		marginLeft: 'auto',
		marginRight: 'auto'
	},
	artistImageDiv: {
		textAlign: 'center',
		display: 'inline-block',
		verticalAlign: 'top',
		width: '50%',
		marginBottom: '5%',
		[theme.breakpoints.up('sm')]: {
			width: '33%',
		},
		[theme.breakpoints.up('lg')]: {
			width: '33%',
		},
		[theme.breakpoints.up('xl')]: {
			width: '16.5%',
		}
	},
	directorImageDiv: {
		marginBottom: 0
	},
	artistImage: {
		height: '80px',
		maxWidth: '90%',
		[theme.breakpoints.up('sm')]: {
			height: 100
		},
		[theme.breakpoints.up('md')]: {
			height: 160
		},
		[theme.breakpoints.up('lg')]: {
			height: 120
		},
		[theme.breakpoints.up('xl')]: {
			height: 200
		},
	},
	artistLink: {
		textAlign: 'center',
		display: 'inline-block'
	},
	link: {
		fontWeight: 'bold',
		textDecoration: 'none',
		color: '#35A4F5'
	},
	title: {
		textAlign: 'center',
		color: '#FF3C3C'
	},
	posterDiv: {
		textAlign: 'center'
	},
	poster: {
		maxWidth: 270,
		maxHeight: 360,
		marginBottom: '10%',
		[theme.breakpoints.up('sm')]: {
			maxWidth: 240,
			maxHeight: 320,
			marginBottom: '8%'
		},
		[theme.breakpoints.up('md')]: {
			maxWidth: 300,
			maxHeight: 400,
			marginBottom: '5%'
		}
	}
});

const Container = styled("div")(({ theme }) => ({
	'.paper': {
		height: 80,
		width: 60,
		marginLeft: 'auto',
		marginRight: 'auto'
	},
	'.artistImageDiv': {
		textAlign: 'center',
		display: 'inline-block',
		verticalAlign: 'top',
		// width: '50%',
		marginBottom: '5%',
		[theme.breakpoints.up('sm')]: {
			// width: '33%',
		},
		[theme.breakpoints.up('lg')]: {
			// width: '33%',
		},
		[theme.breakpoints.up('xl')]: {
			width: '16.5%',
		}
	},
	'.directorImageDiv': {
		marginBottom: 0
	},
	'.artistImage': {
		height: '80px',
		maxWidth: '90%',
		[theme.breakpoints.up('sm')]: {
			height: 100
		},
		[theme.breakpoints.up('md')]: {
			height: 160
		},
		[theme.breakpoints.up('lg')]: {
			height: 120
		},
		[theme.breakpoints.up('xl')]: {
			height: 200
		},
	},
	'.artistLink': {
		textAlign: 'center',
		display: 'inline-block'
	},
	'.link': {
		fontWeight: 'bold',
		textDecoration: 'none',
		color: '#35A4F5'
	},
	'.title': {
		textAlign: 'center',
		color: '#FF3C3C'
	},
	'.posterDiv': {
		textAlign: 'center'
	},
	'.poster': {
		maxWidth: 270,
		maxHeight: 360,
		marginBottom: '10%',
		[theme.breakpoints.up('sm')]: {
			maxWidth: 240,
			maxHeight: 320,
			marginBottom: '8%'
		},
		[theme.breakpoints.up('md')]: {
			maxWidth: 300,
			maxHeight: 400,
			marginBottom: '5%'
		}
	}
}));

class MovieDetailCore extends Component {
	handleUpdateClick = event => (this.props.onUpdateClick && this.props.onUpdateClick());

	renderTitle = () => {
		if (!this.props.isEmpty()) {
			return (
				<h1
					className="title"
				>
					{this.props.movie.name}
				</h1>
			);
		}
	};

	renderImage = () => {
		return (
			<div className="posterDiv">
				<img
					className="poster"
					alt={this.props.movie.name}
					src={this.props.movie.imageUrl}
				/>
			</div>
		);
	};

	renderField = (key, content, displayKey = '') => {
		let formattedKey = key.toLowerCase().replace(/ /, '');
		if ('' === displayKey) {
			displayKey = key;
		}
		return (
			<Grid item xs={12}>
				<Grid container justify="center" spacing={16}>
					<Grid
						item
						xs={3}
						key={formattedKey + '-key'}
					>
						{displayKey + ':'}
					</Grid>
					<Grid
						item
						xs={9}
						key={formattedKey + '-value'}
					>
						{content}
					</Grid>
				</Grid>
			</Grid>
		);
	};

	renderLanguageDetails = () => {
		return (this.renderField('Language', this.props.movie.language.name));
	};

	renderReleaseDateDetails = () => {
		let releaseDate = this.props.movie.releaseDate;

		let markup = (
			// <Link
			// 	to={'/movies/browseMovies?year[]=' + year + '&year[]=' + year + '&order=id Desc'}
			// >
			// 	<span className={this.props.classes.link}>
			// 		{year}
			// 	</span>
			// </Link>
			<span>
				{Utils.formatDateToString(releaseDate)}
			</span>
		);
		return (this.renderField('Release Date', markup));
	};

	renderSizeDetails = () => {
		if (this.props.movie.obtained) {
			return (this.renderField('Size', ((this.props.movie.size / (1024 * 1024)).toFixed(3) + ' MB (' + this.props.movie.size + ')')));
		}
	};

	renderFormatDetails = () => {
		if (this.props.movie.obtained) {
			return (this.renderField('Format', this.props.movie.format.name));
		}
	};

	renderQualityDetails = () => {
		if (this.props.movie.obtained) {
			return (this.renderField('Quality', Utils.ucfirst(this.props.movie.quality)));
		}
	};

	renderSubtitleDetails = () => {
		if (this.props.movie.obtained) {
			return (this.renderField('Subtitles', ((this.props.movie.subtitles) ? 'Yes' : 'No'), 'Subtitles?'));
		}
	};

	renderSeenDetails = () => {
		return (this.renderField('Seen', ((this.props.movie.seenInTheatre) ? 'Yes' : 'No'), 'Theatre?'));
	};

	renderBaseName = () => {
		if (this.props.movie.obtained && '' !== this.props.movie.basename) {
			return (this.renderField('Basename', this.props.movie.basename));
		}
	};

	renderDirectors = () => {
		let artistMarkup = this.props.movie.directors.map((director) => (
			<div className="artistImageDiv directorImageDiv">
				<div>
					<img
						className="artistImage"
						src={director.imageUrl}
						alt={director.name}
					/>
				</div>

				<div className="artistLink">
					<Link
						to={'/movies/browseMovies?directorIds[]=' + director.id + '&order=releaseDate Desc'}
					>
					<span className="link">
						{director.name}
					</span>
					</Link>
				</div>
			</div>
		));

		return (this.renderField('Directors', artistMarkup));
	};

	renderActors = () => {
		let artistMarkup = this.props.movie.actors.map((actor) => (
			<div className="artistImageDiv">
				<div>
					<img
						className="artistImage"
						src={actor.imageUrl}
						alt={actor.name}
					/>
				</div>

				<div className="artistLink">
					<Link
						to={'/movies/browseMovies?actorIds[]=' + actor.id + '&order=releaseDate Desc'}
					>
					<span className="link">
						{actor.name}
					</span>
					</Link>
				</div>
			</div>
		));

		return (this.renderField('Actors', artistMarkup));
	};

	renderDetails = () => {
		if (!this.props.isEmpty()) {
			return (
				<div className="detailsSection">
					<Grid container spacing={3}>
						{this.renderDirectors()}
						{this.renderActors()}
						{this.renderLanguageDetails()}
						{this.renderReleaseDateDetails()}
						{this.renderSizeDetails()}
						{this.renderFormatDetails()}
						{this.renderQualityDetails()}
						{this.renderSubtitleDetails()}
						{this.renderSeenDetails()}
						{this.renderBaseName()}
					</Grid>
				</div>
			);
		}
	};

	render() {
		return (
			<Container>
				<div className="movieDetailsContainer">
					{this.renderTitle()}
					<Grid container spacing={3}>
						<Grid xs={12} sm={4} size={{xs: 12, sm: 4}}>
							{this.renderImage()}

							<div style={{'textAlign': 'center'}}>
								<Button color={'primary'} variant={'contained'} onClick={this.handleUpdateClick}>
									<EditIcon />
									&nbsp;
									Edit
								</Button>
							</div>
						</Grid>

						<Grid xs={12} sm={8} size={{xs: 12, sm: 8}}>
							{this.renderDetails()}
						</Grid>
					</Grid>
				</div>
			</Container>
		);
	}
}

MovieDetailCore.propTypes = {
	classes: PropTypes.object.isRequired
};

export default MovieDetailCore;