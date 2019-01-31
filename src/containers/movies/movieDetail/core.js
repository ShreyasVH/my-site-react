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
import './styles.css';

const styles = theme => ({
	paper: {
		height: 80,
		width: 60,
		marginLeft: 'auto',
		marginRight: 'auto'
	}
});

class MovieDetailCore extends Component {
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
		return (this.renderField('Language', this.props.movie.language.name));
	};

	renderYearDetails = () => {
		let year = this.props.movie.year;

		let markup = (
			<Link
				to={'/movies/browseMovies?year[]=' + year + '&year[]=' + year}
			>
				{year}
			</Link>
		);
		return (this.renderField('Year', markup));
	};

	renderSizeDetails = () => {
		return (this.renderField('Size', ((this.props.movie.size / (1024 * 1024)).toFixed(3) + ' MB (' + this.props.movie.size + ')')));
	};

	renderFormatDetails = () => {
		return (this.renderField('Format', this.props.movie.format.name));
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
		let artistMarkup = this.props.movie.directors.map(director => (
			<Grid
				item
				xs={3}
				key={director.id}
			>
				<Paper
					className={this.props.classes.paper}
				>
					<div
						className="artist-image"
					>
						<img
							src={director.image}
							alt={director.name}
						/>
					</div>
				</Paper>
				<div
					className="artist-link"
				>
					<Link
						to={'/movies/browseMovies?directors[]=' + director.id}
					>
						{director.name}
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
		let artistMarkup = this.props.movie.actors.map(actor => (
			<Grid
				item
				xs={4}
				key={actor.id}
			>
				<Paper
					className={this.props.classes.paper}
				>
					<div
						className="artist-image"
					>
						<img
							src={actor.image}
							alt={actor.name}
						/>
					</div>
				</Paper>
				<div
					className="artist-link"
				>
					<Link
						to={'/movies/browseMovies?actors[]=' + actor.id}
					>
						{actor.name}
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