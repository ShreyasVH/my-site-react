/**
 * @author shreyas.hande on 9/2/18
 *
 */
import React, { Component } from 'react';

import {
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Toolbar,
	AppBar,
	CssBaseline, Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";


import Hamburger from '../hamburger';

// import ModeSelector from '../../components/modeSelector';

import './styles.css';

export default class Header extends Component {
	openHamburger = () => {
		this.hamburger.openHamburger();
	};

	render() {
		return (
			<div>
				<AppBar
					position="static"
					className="colorPrimary"
					sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
				>
					<Toolbar>
						<IconButton
							className="menuButton"
							edge="start"
							color="inherit"
							aria-label="Menu"
							onClick={this.openHamburger}
						>
							<Menu />
						</IconButton>
						<Typography variant="title" color="inherit" className="flex">
							Hande
						</Typography>

						{/*<ModeSelector*/}
							{/*className="modeSelectorWrap"*/}
						{/*/>*/}
					</Toolbar>
				</AppBar>

				<Hamburger
					ref={hamburger => (this.hamburger = hamburger)}
				/>
			</div>
		);
	}
}