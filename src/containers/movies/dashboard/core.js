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

import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
	title: {
		textAlign: 'center',
		color: '#FF3C3C'
	},
	root: {
		width: '90%',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: '20px',
		overflowX: 'auto'
	},
	cell: {
		width: 'auto',
		maxWidth: '10px'
	},
	headCell: {
		backgroundColor: 'black',
		color: 'white !important'
	},
	link: {
		textDecoration: 'none',
		color: '#35A4F5',
		fontWeight: 'bold'
	}
});

class DashBoardCore extends Component {
	renderHeader = () => (
		<h1 className={this.props.classes.title}>
			The Movie Database
		</h1>
	);

	renderTable = () => (
		<Paper className={this.props.classes.root}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell className={`${this.props.classes.cell} ${this.props.classes.headCell}`}>Language</TableCell>
						<TableCell className={this.props.classes.headCell} numeric>No of Movies</TableCell>
						<TableCell className={this.props.classes.headCell} numeric>
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
									<Link to={'/movies/browseMovies?languageId[]=' + row.language_id + '&order=name ASC'}>
										<span className={this.props.classes.link}>
											{row.language}
										</span>
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

DashBoardCore.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DashBoardCore);
