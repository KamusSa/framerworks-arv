import React, { Component } from 'react';
import MiComponente from './MiComponente';

class SeccionPruebas extends Component {

	contador = 0;

	// constructor(props){
	// 	super(props);
	// 	this.state = {
	// 		contador: 0
	// 	}
	// }

	state = {
		contador: 0
	}

	holaMundo(nombre, edad) {
		var presentacion = (
			<div>
				<h2>Hola, soy {nombre}</h2>
				<h3>Tengo {edad} años</h3>
			</div>
		);
		return presentacion;
	}

	sumar = (e) => {
		// this.state.contador = this.state.contador + 1;
		this.setState({
			contador: (this.state.contador +1)
		});
	}

	restar = (e) => {
		// this.state.contador = this.state.contador - 1;
		this.setState({
			contador: (this.state.contador -1)
		});
	}

	render() {
		var nombre = 'Luis Antonio';
		return (
			<section id="content">
				<h2 className="subheader">Últimos artículos</h2>

				<p>Bienvenido al Curso de React</p>

				<h2 className="subheader">Funciones y JSX Básico</h2>
				{this.holaMundo(nombre, 43)}

				<h2 className="subheader">Componentes</h2>
				<section className="componentes">
					<MiComponente />
				</section>

				<h2 className="subheader">Estados</h2>
				<p>contado:  {this.state.contador}</p>

				<p>
					<input type="button" value="Sumar"  onClick={this.sumar}/>
					<input type="button" value="Restar" onClick={this.restar}/>
				</p>


			</section>
			
		);
	}
}

export default SeccionPruebas;