import React , { Component } from 'react';

import axios from 'axios';

import Menu from './Menu';

export default class ResepAdd extends Component {
	constructor(props){
		super(props);
		// bind kedua handler agar dapat menggunakan this
		this.onSubmit = this.onSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			// form value boject
			formValue : {
				name : ''
			}
		}
	}
	
	onSubmit(event){
		event.preventDefault();
		//console.log(this.state.formValue.name);
		//console.log(this.state.name);
		//console.log(this.state.description);
		//console.log(this.state.ingredient);
		//console.log(this.state.direction);
				
		axios.post('http://localhost:3001/resep/', {
			name: this.state.name,
			description:this.state.description,
			ingredient:this.state.ingredient,
			direction:this.state.direction
		})
		.then(function (response) {
			var id=response.data.reseps.id;
			window.location = "http://localhost:3000/resep/"+id;
		})
		.catch(function (error) {
			console.log(error);
		});		
	}

	handleChange(key) {
		if(!this.changeHandlers) this.changeHandlers = {};
		return this.changeHandlers[key] || (this.changeHandlers[key] = event => this.setState({[key]: event.target.value}));
	}

	render() {
		return (
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
							<input type="submit" value="submit" />
						</form>					
					</div>
				</div>				
			</div>
		);
	}  
}

//export default ResepAdd;