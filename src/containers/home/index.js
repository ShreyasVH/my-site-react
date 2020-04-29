/**
 * @author shreyas.hande on 9/2/18
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import './styles.css';

export default class Home extends Component {
	render() {

		return (
			<div>
				<Helmet
					title="My New Website"
				/>
				<h1 className="title">
					Welcome to my new Website
				</h1>

				<Card className="project">
					<CardContent>
						<Link to="/movies/dashboard">
							MOVIE MANIA
						</Link>
					</CardContent>
				</Card>

				<br />

				<Card className="project">
					<CardContent>
						<Link to="/songs/dashboard">
							AUDIO BOX
						</Link>
					</CardContent>
				</Card>

				<br />

				<Card className="project">
					<CardContent>
						<Link to="/index/knowYourDay">
							KNOW YOUR DAY
						</Link>
					</CardContent>
				</Card>

				<br />

				<Card className="project">
					<CardContent>
						<Link to="/cards/browse?order=name%20ASC">
							LET'S DUEL
						</Link>
					</CardContent>
				</Card>

				<br />

				<Card className="project">
					<CardContent>
						<Link to="/logs/filters">
							LOGS
						</Link>
					</CardContent>
				</Card>

				<br />

				<Card className="project">
					<CardContent>
						<Link to="cricbuzz/browse">
							HOWZZAT
						</Link>
					</CardContent>
				</Card>
			</div>
		);
	}
}
