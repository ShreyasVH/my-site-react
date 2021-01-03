import React, { Component } from 'react';
import Loadable from 'react-loadable';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from './containers/notFound';
import Header from './components/header';
import Loader from './components/loader';
import Notify from './components/notify';
import Context from "./utils/context";
import Utils from "./utils";
import store from './store';
import { RouteMappings } from './routes';

class App extends Component {
	componentDidMount() {
		window.addEventListener('resize', this.onResize.bind(this));
	}

	onResize = (event) => {
		let storeValues = store.getState();
		let previousIsMobile = storeValues.context.isMobile;
		let newIsMobile = Utils.isMobile(window.innerWidth);

		if (newIsMobile !== previousIsMobile) {
			Context.updateContext({
				isMobile: newIsMobile
			});
		}
	}

	render() {
		return (
			<div>
				<Router>
					<div>
						<Header />
						<div className="container">
							<Switch>
								{RouteMappings.map(details => {
									const LoadableComponent = Loadable({
										loader: () => import(`${details.filePath}`),
										loading() {
											return <div />
										}
									});
									return (
										<Route
											exact={details.exact}
											path={details.route}
											component={LoadableComponent}
										/>
									);
								})}
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
