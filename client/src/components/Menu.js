import React , { Component } from 'react';
import {Link} from 'react-router-dom'

import '../App.css';

class Menu extends Component {
	render() {
		return (
			<nav class="navbar navbar-default">
			  <div class="container-fluid">
				<div class="navbar-header">
				  <a class="navbar-brand" href="#">Resep Masak</a>
				</div>
				<ul class="nav navbar-nav">
				  <li class="active"><Link to="/">Semua Resep</Link></li>
				  <li><Link to="/add">Tambah Resep</Link></li>
				  <li><Link to="/about">About</Link></li>
				  <li><Link to="/contact">Contact</Link></li>
				</ul>
			  </div>
			</nav>
		);
	}

}

export default Menu;