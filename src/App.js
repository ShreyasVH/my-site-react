import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './containers/home';
import NotFound from './containers/notFound';
// import Test from './containers/test';
import Header from './components/header';
import Loader from './components/loader';
import Notify from './components/notify';

import MoviesDashboard from './containers/movies/dashboard';
import BrowseMovies from './containers/movies/browseMovies';
import MovieDetail from './containers/movies/movieDetail';
// import ActorList from './containers/movies/actorList';
// import DirectorList from './containers/movies/directorList';
// import DeletedMovies from './containers/movies/deletedMovies';

import BrowseCards from './containers/cards/browse';
import CardDetail from './containers/cards/detail';

import Logs from './containers/logs';

import CricbuzzBrowse from './containers/cricbuzz/browse';
import Tour from './containers/cricbuzz/tour/detail';
import Series from './containers/cricbuzz/series/detail';
import Match from './containers/cricbuzz/match/detail';
import CreateMatch from './containers/cricbuzz/match/create';

class App extends Component {
	render() {
		return (
			<div>
				<Router>
					<div>
						<Header />
						<div className="container">
							<Switch>
								<Route exact path="/" component={Home} />

								<Route path="/movies/dashboard" component={MoviesDashboard} />
								<Route path="/movies/browseMovies" component={BrowseMovies} />
								<Route path="/movies/movieDetail" component={MovieDetail} />
								{/*<Route path="/movies/actorList" component={ActorList} />*/}
								{/*<Route path="/movies/directorList" component={DirectorList} />*/}
								{/*<Route path="/movies/deletedMovies" component={DeletedMovies} />*/}

								{/*<Route path="/test" component={Test} />*/}
								<Route path="/cards/browse" component={BrowseCards} />
								<Route path="/cards/detail" component={CardDetail} />

								<Route path="/logs/filters" component={Logs} />

								<Route path="/cricbuzz/browse" component={CricbuzzBrowse} />
								<Route path="/cricbuzz/tours/detail" component={Tour} />
								<Route path="/cricbuzz/series/detail" component={Series} />
								<Route path="/cricbuzz/matches/detail" component={Match} />
								<Route path="/cricbuzz/matches/create" component={CreateMatch} />

								<Route component={NotFound} />
							</Switch>
						</div>
						<Loader />
						<Notify />
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
