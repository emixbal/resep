import React , { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';

import Menu from './Menu';

const API = 'http://localhost:3001/resep/';

class ResepUpdate extends Component {
	constructor(props){
		super(props);
		// bind kedua handler agar dapat menggunakan this
		this.onSubmit = this.onSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			reseps: [],
			// form value boject
			formValue : {
				name : ''
			},
		}
	}
	
	onSubmit(event){
		event.preventDefault();
		
		axios.post('http://localhost:3001/resep/update', {
			id:this.state.id,
			name: this.state.name,
			description:this.state.description,
			ingredient:this.state.ingredient,
			direction:this.state.direction
		})
		.then(function (response) {
			window.location = "http://localhost:3000/resep/"+response.data.id;
		})
		.catch(function (error) {
			console.log(error);
		});
		
	}

	handleChange(key) {
		if(!this.changeHandlers) this.changeHandlers = {};
		return this.changeHandlers[key] || (this.changeHandlers[key] = event => this.setState({[key]: event.target.value}));
	}	

	componentDidMount() {
		fetch(API+this.props.match.params.id).then(response => response.json())
		.then(data => this
		.setState({
			reseps: data.reseps,
			
			id:data.reseps.id,
			name:data.reseps.name,
			description:data.reseps.description,
			ingredient:data.reseps.ingredient,
			direction:data.reseps.direction
			
			}));
	}
	
	render() {
		const { reseps } = this.state;
		
		return(
			<div class="container">
				<Menu />
				<div class="row">
					<div class="col-md-6 col-md-offset-3">
						<pre>
							<p>testing data mode, nanti dihapus</p>
							{JSON.stringify(this.state, null, 4)}
						</pre>
						<form onSubmit={this.onSubmit}>
							<div class="form-group">
								<label>Nama Menu </label>
								<input class="form-control" type="text" value={this.state.name} onChange={this.handleChange("name")}/>
							</div>
							<div class="form-group">
								<label>Deskripsi</label>
								<textarea class="form-control" value={this.state.description} onChange={this.handleChange("description")}></textarea>
							</div>
							<div class="form-group">
								<label>Ingredients </label>
								<textarea class="form-control" value={this.state.ingredient} onChange={this.handleChange("ingredient")}></textarea>
							</div>
							<div class="form-group">
								<label>Directions</label>
								<textarea class="form-control" value={this.state.direction} onChange={this.handleChange("direction")}></textarea>
							</div>							
							<input type="submit" value="submit" class="btn btn-primary"/>
						</form>					
					</div>
				</div>				
			</div>
		);
	}
}

export default ResepUpdate;