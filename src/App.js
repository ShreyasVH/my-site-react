import React, { Component } from 'react';
import Loadable from 'react-loadable';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from './containers/notFound';
import Header from './components/header';
import Loader from './components/loader';
import Notify from './components/notify';

const LoadableHome = Loadable({
	loader: () => import('./containers/home'),
	loading() {
		return <div>Loading...</div>
	}
});

const LoadableMoviesDashboard = Loadable({
	loader: () => import('./containers/movies/dashboard'),
	loading() {
		return <div>Loading...</div>
	}
});

const LoadableBrowseMovies = Loadable({
	loader: () => import('./containers/movies/browseMovies'),
	loading() {
		return <div>Loading...</div>
	}
});

const LoadableMovieDetail = Loadable({
	loader: () => import('./containers/movies/movieDetail'),
	loading() {
		return <div>Loading...</div>
	}
});

const LoadableBrowseCards = Loadable({
	loader: () => import('./containers/cards/browse'),
	loading() {
		return <div>Loading...</div>
	}
});

const LoadableCardDetail = Loadable({
	loader: () => import('./containers/cards/detail'),
	loading() {
		return <div>Loading...</div>
	}
});

const LoadableLogs = Loadable({
	loader: () => import('./containers/logs'),
	loading() {
		return <div>Loading...</div>
	}
});

const LoadableCricBrowse = Loadable({
	loader: () => import('./containers/cricbuzz/browse'),
	loading() {
		return <div>Loading...</div>
	}
});

const LoadableTourDetail = Loadable({
	loader: () => import('./containers/cricbuzz/tour/detail'),
	loading() {
		return <div>Loading...</div>
	}
});

const LoadableUpdateTour = Loadable({
	loader: () => import('./containers/cricbuzz/tour/update'),
	loading() {
		return <div>Loading...</div>
	}
});

const LoadableSeries = Loadable({
	loader: () => import('./containers/cricbuzz/series/detail'),
	loading() {
		return <div>Loading...</div>
	}
});

const LoadableMatch = Loadable({
	loader: () => import('./containers/cricbuzz/match/detail'),
	loading() {
		return <div>Loading...</div>
	}
});

const LoadableCreateMatch = Loadable({
	loader: () => import('./containers/cricbuzz/match/create'),
	loading() {
		return <div>Loading...</div>
	}
});

const LoadableUpdateStadium = Loadable({
	loader: () => import('./containers/cricbuzz/stadium/update'),
	loading() {
		return <div>Loading...</div>
	}
});

const LoadableUpdateCountry = Loadable({
	loader: () => import('./containers/cricbuzz/country/update'),
	loading() {
		return <div>Loading...</div>
	}
});

class App extends Component {
	render() {
		return (
			<div>
				<Router>
					<div>
						<Header />
						<div className="container">
							<Switch>
								<Route exact path="/" component={LoadableHome} />

								<Route path="/movies/dashboard" component={LoadableMoviesDashboard} />
								<Route path="/movies/browseMovies" component={LoadableBrowseMovies} />
								<Route path="/movies/movieDetail" component={LoadableMovieDetail} />

								<Route path="/cards/browse" component={LoadableBrowseCards} />
								<Route path="/cards/detail" component={LoadableCardDetail} />

								<Route path="/logs/filters" component={LoadableLogs} />

								<Route path="/cricbuzz/browse" component={LoadableCricBrowse} />

								<Route path="/cricbuzz/tours/detail" component={LoadableTourDetail} />
								<Route path="/cricbuzz/tours/update" component={LoadableUpdateTour} />

								<Route path="/cricbuzz/series/detail" component={LoadableSeries} />

								<Route path="/cricbuzz/matches/detail" component={LoadableMatch} />
								<Route path="/cricbuzz/matches/create" component={LoadableCreateMatch} />

								<Route path="/cricbuzz/stadiums/update" component={LoadableUpdateStadium} />

								<Route path="/cricbuzz/countries/update" component={LoadableUpdateCountry} />

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
