/**
 * @author shreyas.hande on 9/9/18
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import MovieCard from '../movieList/card';

import Utils from '../../../utils';

const styles = theme => ({
	paper: {
		height: 80,
		width: 60,
		marginLeft: 'auto',
		marginRight: 'auto'
	},
	artistImage: {
		height: '80px',
		width: '60px'
	},
	artistLink: {
		textAlign: 'center'
	},
	link: {
		fontWeight: 'bold',
		textDecoration: 'none',
		color: '#35A4F5'
	},
	title: {
		textAlign: 'center',
		color: '#FF3C3C'
	}
});

class MovieDetailCore extends Component {
	renderTitle = () => {
		if (!this.props.isEmpty()) {
			return (
				<h1
					className={this.props.classes.title}
				>
					{this.props.movie.name}
				</h1>
			);
		}
	};

	renderImage = () => {
		return (
			<Grid container spacing={16}>
				<Grid item xs={12}>
					<Grid container justify="center" spacing={16}>
						<MovieCard
							movie={this.props.movie}
							showLink={false}
						/>
					</Grid>
				</Grid>
			</Grid>
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
		return (this.renderField('Language', this.props.movie.languageName));
	};

	renderYearDetails = () => {
		let year = this.props.movie.year;

		let markup = (
			<Link
				to={'/movies/browseMovies?year[]=' + year + '&year[]=' + year}
			>
				<span className={this.props.classes.link}>
					{year}
				</span>
			</Link>
		);
		return (this.renderField('Year', markup));
	};

	renderSizeDetails = () => {
		return (this.renderField('Size', ((this.props.movie.size / (1024 * 1024)).toFixed(3) + ' MB (' + this.props.movie.size + ')')));
	};

	renderFormatDetails = () => {
		return (this.renderField('Format', this.props.movie.formatName));
	};

	renderQualityDetails = () => {
		return (this.renderField('Quality', Utils.ucfirst(this.props.movie.quality)));
	};

	renderSubtitleDetails = () => {
		return (this.renderField('Subtitles', ((this.props.movie.subtitles) ? 'Yes' : 'No'), 'Has Subtitles?'));
	};

	renderSeenDetails = () => {
		return (this.renderField('Seen', ((this.props.movie.seen_in_theatre) ? 'Yes' : 'No'), 'Seen in Theatre?'));
	};

	renderBaseName = () => {
		if ('' !== this.props.movie.basename) {
			return (this.renderField('Basename', this.props.movie.basename));
		}
	};

	renderDirectors = () => {
		let artistMarkup = this.props.movie.directors.map((directorId, index) => (
			<Grid
				item
				xs={3}
				key={directorId}
			>
				<Paper
					className={this.props.classes.paper}
				>
					<div>
						<img
							className={this.props.classes.artistImage}
							src={this.props.movie.directorImageUrls[index]}
							alt={this.props.movie.directorNames[index]}
						/>
					</div>
				</Paper>
				<div
					className={this.props.classes.artistLink}
				>
					<Link
						to={'/movies/browseMovies?directors[]=' + directorId}
					>
						<span className={this.props.classes.link}>
							{this.props.movie.directorNames[index]}
						</span>
					</Link>
				</div>
			</Grid>
		));

		let markup = (
			<Grid container spacing={16}>
				<Grid item xs={12}>
					<Grid container justify="center" spacing={16}>
						{artistMarkup}
					</Grid>
				</Grid>
			</Grid>
		);

		return (this.renderField('Directors', markup));
	};

	renderActors = () => {
		let artistMarkup = this.props.movie.actors.map((actorId, index) => (
			<Grid
				item
				xs={4}
				key={actorId}
			>
				<Paper
					className={this.props.classes.paper}
				>
					<div>
						<img
							className={this.props.classes.artistImage}
							src={this.props.movie.actorImageUrls[index]}
							alt={this.props.movie.actorNames[index]}
						/>
					</div>
				</Paper>
				<div
					className={this.props.classes.artistLink}
				>
					<Link
						to={'/movies/browseMovies?actors[]=' + actorId}
					>
						<span className={this.props.classes.link}>
							{this.props.movie.actorNames[index]}
						</span>
					</Link>
				</div>
			</Grid>
		));

		let markup = (
			<Grid container spacing={16}>
				<Grid item xs={12}>
					<Grid container justify="center" spacing={8}>
						{artistMarkup}
					</Grid>
				</Grid>
			</Grid>
		);

		return (this.renderField('Actors', markup));
	};

	renderDeatils = () => {
		if (!this.props.isEmpty()) {
			return (
				<div className="detailsSection">
					<Grid container spacing={16}>
						{this.renderDirectors()}
						{this.renderActors()}
						{this.renderLanguageDetails()}
						{this.renderYearDetails()}
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
			<div className="movieDetailsContainer">
				{this.renderTitle()}
				{this.renderImage()}
				{this.renderDeatils()}
			</div>
		);
	}
}

MovieDetailCore.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieDetailCore);