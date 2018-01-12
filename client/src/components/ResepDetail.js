import React , { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';

import Menu from './Menu';

const API = 'http://localhost:3001/resep/';

class ResepDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reseps: [],
		};
	}

	componentDidMount() {
		fetch(API+this.props.match.params.id).then(response => response.json())
		.then(data => this
		.setState({ reseps: data.reseps }));
	}
	
	handleDeleteClick(event) {
		var resep_id=event.target.value;
		var url = API+resep_id;
		
		axios.delete(url)
		.then(function (response){
			window.location = 'http://localhost:3000/';
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	
	render() {
		const { reseps } = this.state;
		
		return(
			<div class="container">
			<Menu />
				<div class="row">
					<div class="col-lg-6 col-lg-offset-3">
						<div class="panel panel-default">
							<div class="panel-body">
								<h3>{reseps.name}</h3>
								<p>{reseps.description}</p>
								<label>Bahan:</label>
								<p>{reseps.ingredient}</p>
								<label>Petunjuk memasak:</label>
								<p>{reseps.direction}</p>
							</div>
							<div class="panel-footer">
								<button class="btn btn-danger" onClick={this.handleDeleteClick} value={reseps.id}>Hapus</button>
								<Link to={'/resep/update/'+reseps.id} class="btn btn-warning pull-right">Edit</Link>								
							</div>
						</div>					
					</div>
				</div>			
			</div>
		);
	}
}

export default ResepDetail;