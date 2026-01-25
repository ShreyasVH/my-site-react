/**
 * @author shreyas.hande on 9/2/18
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import { Card, CardContent } from '@mui/material';

import './styles.css';

export default class Home extends Component {
	render() {

		const items = [
			{
				link: '/movies/dashboard',
				displayName: 'MOVIE MANIA'
			},
			{
				link: '/songs/dashboard',
				displayName: 'AUDIO BOX'
			},
			{
				link: '/index/knowYourDay',
				displayName: 'KNOW YOUR DAY'
			},
			{
				link: '/cards/browse?order=name%20ASC',
				displayName: 'LET\'S DUEL'
			},
			{
				link: '/logs/filters',
				displayName: 'LOGS'
			},
			{
				link: '/cricbuzz/browse',
				displayName: 'HOWZZAT'
			}
		];

		return (
			<div>
				<Helmet
					title="My New Website"
				/>
				<h1 className="title">
					Welcome to my new Website
				</h1>

				{
					items.map(item => (
						<>
							<Card className="project" sx={{'textAlign': 'center', 'color': '#35A4F5'}}>
								<CardContent>
									<Link to={item.link}>
										{item.displayName}
									</Link>
								</CardContent>
							</Card>
							<br />
						</>

					))
				}



			</div>
		);
	}
}
