/**
 * @author shreyas.hande on 9/2/18
 *
 */
import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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
				>
					<Toolbar>
						<IconButton
							className="menuButton"
							color="inherit"
							aria-label="Menu"
							onClick={this.openHamburger}
						>
							<MenuIcon />
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