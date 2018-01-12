import React, { Component } from 'react';
import {Link} from 'react-router-dom'


import Menu from './components/Menu';

const API = 'http://localhost:3001/resep';

class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			reseps: [],
		};
	}

	componentDidMount() {
		fetch(API).then(response => response.json())
		.then(data => this
		.setState({ reseps: data.reseps }));
	}	
	
	render() {
		const { reseps } = this.state;

		return (
			<div class="container">
				<div class="jumbotron">
					<h1>Cooking cooking...</h1> 
					<p>Jelajah lebih banyak resep masakan.</p> 
				</div>
				<Menu />
				{reseps.map(resep =>
					<div class="panel panel-default">
						<div class="panel-body">
							<Link to={'/resep/'+resep.id}><h4>{resep.name}</h4></Link>
							<p>{resep.description}</p>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default App;
