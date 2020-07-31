import React, { Component } from 'react';
import Loadable from 'react-loadable';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Home from './containers/home';
import NotFound from './containers/notFound';
// import Test from './containers/test';
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
								{/*<Route path="/movies/actorList" component={ActorList} />*/}
								{/*<Route path="/movies/directorList" component={DirectorList} />*/}
								{/*<Route path="/movies/deletedMovies" component={DeletedMovies} />*/}

								{/*<Route path="/test" component={Test} />*/}
								<Route path="/cards/browse" component={LoadableBrowseCards} />
								<Route path="/cards/detail" component={LoadableCardDetail} />

								<Route path="/logs/filters" component={LoadableLogs} />
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
