/**
 * @author shreyas.hande on 9/2/18
 *
 */
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import MovieIcon from '@material-ui/icons/Movie';
import AudioIcon from '@material-ui/icons/MusicVideo';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import NoteIcon from '@material-ui/icons/Note';
import VideoGameAssetIcon from '@material-ui/icons/VideogameAsset';

import './styles.css';

export default class Hamburger extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
	}

	openHamburger = (event) => {
		this.setState({
			open: true
		});
	};

	closeHamburger = (event) => {
		this.setState({
			open: false
		});
	};

	render() {
		return (
			<Drawer open={this.state.open} onClose={this.closeHamburger}>
				<List>
					<Link
						to="/"
						onClick={this.closeHamburger}
					>
						<ListItem>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText
								primary="Home"
							/>
						</ListItem>
					</Link>
				</List>

				<Divider />

				<List component="nav">
					<ListItem>
						<ListItemIcon>
							<MovieIcon />
						</ListItemIcon>
						<ListItemText
							primary="Movies"
						/>
					</ListItem>

					<Link
						to="/movies/dashboard"
						onClick={this.closeHamburger}
					>
						<ListItem>
							<ListItemText
								inset
								primary="Dashboard"
							/>
						</ListItem>
					</Link>

					<Link
						to="/movies/actorList"
						onClick={this.closeHamburger}
					>
						<ListItem>
							<ListItemText
								inset
								primary="By Actors"
							/>
						</ListItem>
					</Link>

					<Link
						to="/movies/directorList"
						onClick={this.closeHamburger}
					>
						<ListItem>
							<ListItemText
								inset
								primary="By Directors"
							/>
						</ListItem>
					</Link>

					<Link
						to="/movies/yearList"
						onClick={this.closeHamburger}
					>
						<ListItem>
							<ListItemText
								inset
								primary="By Years"
							/>
						</ListItem>
					</Link>

					<Link
						to="/movies/actorCombinations"
						onClick={this.closeHamburger}
					>
						<ListItem>
							<ListItemText
								inset
								primary="Actor Combinations"
							/>
						</ListItem>
					</Link>

					<Link
						to="/movies/deletedMovies"
						onClick={this.closeHamburger}
					>
						<ListItem>
							<ListItemText
								inset
								primary="Deleted Movies"
							/>
						</ListItem>
					</Link>
				</List>

				<Divider />

				<List component="nav">
					<ListItem>
						<ListItemIcon>
							<AudioIcon />
						</ListItemIcon>
						<ListItemText
							primary="Songs"
						/>
					</ListItem>

					<Link
						to="/songs/dashboard"
						onClick={this.closeHamburger}
					>
						<ListItem>
							<ListItemText
								inset
								primary="Dashboard"
							/>
						</ListItem>
					</Link>

					<Link
						to="/songs/singerList"
						onClick={this.closeHamburger}
					>
						<ListItem>
							<ListItemText
								inset
								primary="By Singers"
							/>
						</ListItem>
					</Link>

					<Link
						to="/movies/composerList"
						onClick={this.closeHamburger}
					>
						<ListItem>
							<ListItemText
								inset
								primary="By Composers"
							/>
						</ListItem>
					</Link>

					<Link
						to="/movies/lyricistList"
						onClick={this.closeHamburger}
					>
						<ListItem>
							<ListItemText
								inset
								primary="By Lyricists"
							/>
						</ListItem>
					</Link>

					<Link
						to="/movies/yearList"
						onClick={this.closeHamburger}
					>
						<ListItem>
							<ListItemText
								inset
								primary="By Years"
							/>
						</ListItem>
					</Link>
				</List>

				<Divider />

				<List>
					<Link
						to="/index/knowYourDay"
						onClick={this.closeHamburger}
					>
						<ListItem>
							<ListItemIcon>
								<CalendarIcon />
							</ListItemIcon>
							<ListItemText
								primary="Know Your Day"
							/>
						</ListItem>
					</Link>
				</List>

				<List component="nav">
					<ListItem>
						<ListItemIcon>
							<VideoGameAssetIcon />
						</ListItemIcon>
						<ListItemText
							primary="Cards"
						/>
					</ListItem>

					<Link
						to="/cards/browse"
						onClick={this.closeHamburger}
					>
						<ListItem>
							<ListItemText
								inset
								primary="Browse"
							/>
						</ListItem>
					</Link>
				</List>



				<List>
					<Link
						to="/test"
						onClick={this.closeHamburger}
					>
						<ListItem>
							<ListItemIcon>
								<NoteIcon />
							</ListItemIcon>
							<ListItemText
								primary="Test"
							/>
						</ListItem>
					</Link>
				</List>
			</Drawer>
		);
	}
}