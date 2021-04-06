import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './assets/scss/app.scss';
import store from './config/store';
import { Home } from './components/Home';
import { UnitPage } from './components/UnitsPage';
import { UnitDetailPage } from './components/UnitDetailPage';
import Navbar from './components/Navbar';

function App() {
	return (
		<>
			<Provider store={store}>
				<BrowserRouter>
					<Navbar />

					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/units" component={UnitPage} />
						<Route exact path="/unit/:id" component={UnitDetailPage} />
					</Switch>
				</BrowserRouter>
			</Provider>
		</>
	);
}

export default App;
