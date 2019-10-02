/**
 * @author shreyas.hande on 9/3/18
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import styles from './styles.css';

export default class DashBoardCore extends Component {
	renderHeader = () => (
		<h1 className="title">
			The Movie Database
		</h1>
	);

	renderTable = () => (
		<Paper className={styles.root}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell className={styles.cell}>Language</TableCell>
						<TableCell numeric>No of Movies</TableCell>
						<TableCell numeric>
							Size
							<br />
							(in GB)
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{
						this.props.data.map(row => (
							<TableRow key={row.language_id}>
								<TableCell component="th" scope="row">
									<Link to={'/movies/browseMovies?language[]=' + row.language_id + '&order=name ASC'}>
										{row.language}
									</Link>
								</TableCell>
								<TableCell numeric>{row.count}</TableCell>
								<TableCell numeric>{Math.round(parseInt(row.size, 10) / (1024 * 1024 * 1024), 2)}</TableCell>
							</TableRow>
						))
					}
				</TableBody>
			</Table>
		</Paper>
	);

	render() {
		if (0 !== this.props.data.length) {
			return (
				<div>
					{this.renderHeader()}
					{this.renderTable()}
				</div>
			);
		} else {
			return (
				<div></div>
			);
		}
	}
}
