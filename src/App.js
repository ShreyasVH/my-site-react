import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './containers/home';
import NotFound from './containers/notFound';
// import Test from './containers/test';
import Header from './components/header';
import Loader from './components/loader';

import MoviesDashboard from './containers/movies/dashboard';
// import ActorList from './containers/movies/actorList';
// import DirectorList from './containers/movies/directorList';
// import BrowseMovies from './containers/movies/browseMovies';
// import DeletedMovies from './containers/movies/deletedMovies';
// import MovieDetail from './containers/movies/movieDetail';

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
								{/*<Route path="/movies/actorList" component={ActorList} />*/}
								{/*<Route path="/movies/directorList" component={DirectorList} />*/}
								{/*<Route path="/movies/browseMovies" component={BrowseMovies} />*/}
								{/*<Route path="/movies/deletedMovies" component={DeletedMovies} />*/}
								{/*<Route path="/movies/movieDetail" component={MovieDetail} />*/}

								{/*<Route path="/test" component={Test} />*/}
								<Route component={NotFound} />
							</Switch>
						</div>
						<Loader />
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
