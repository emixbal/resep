import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import ResepAdd from './components/ResepAdd';
import ResepDetail from './components/ResepDetail';
import ResepUpdate from './components/ResepUpdate';


import About from './components/About';
import Contact from './components/Contact';


import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {
	BrowserRouter as Router,
	Route,
} from 'react-router-dom';

ReactDOM.render(
	<Router>
		<div>
			<Route exact path="/" component={App} />
			
			<Route exact path="/add/" component={ResepAdd} />
			<Route exact path="/resep/:id" component={ResepDetail} />
			<Route exact path="/resep/update/:id" component={ResepUpdate} />
			
			<Route path="/about" component={About} />
			<Route path="/contact" component={Contact} />
		</div>
	</Router>,document.getElementById('root'));
registerServiceWorker();