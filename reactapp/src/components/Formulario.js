import React, { Component } from 'react';

import Sidebar from './Sidebar';

class Formulario extends Component {

    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    bioRef = React.createRef();
    generoHRef = React.createRef();
    generoMRef = React.createRef();
    generoOtroRef = React.createRef();

    state = {
        user:{}
    }



    recibirFormulario = (e) => {
        e.preventDefault();

        var genero = 'hombre';

        if (this.generoHRef.current.checked) {
            genero = this.generoHRef.current.value;
        } else if (this.generoMRef.current.checked) {
            genero = this.generoMRef.current.value;
        } else {
            genero= this.generoOtroRef.current.value
        }


        var user = {
            nombre: this.nombreRef.current.value,
            apellidos: this.apellidosRef.current.value,
            bio: this.bioRef.current.value,
            genero: genero
        }
        // console.log(user);
        
        this.setState({
            user: user
        })
  
    }


    render() {
        if (this.state.user.nombre){
            var user = this.state.user;
        }
        return (
            <div id="formulario">
                <div className="center">
                    <div id="content">
                    <h1 className="subheader">Formulario</h1>
                        {this.state.user.nombre &&
                            <div>
                                <p>Nombre: <strong>{user.nombre}</strong></p>
                                <p>Apellidos: <strong>{user.apellidos}</strong></p>
                                <p>Biografía: <strong>{user.bio}</strong></p>
                                <p>Genero: <strong>{user.genero}</strong></p>
                            </div>
                        }
                         

                        {/* FORMULARIO */}
                        <form className="mid-form" onSubmit={this.recibirFormulario}>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" ref={this.nombreRef}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input type="text" name="apellidos" ref={this.apellidosRef}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="bio">Biografia</label>
                                <textarea name="bio" ref={this.bioRef}></textarea>
                            </div>

                            <div className="form-group radibuttons">
                                <input type="radio" name="genero" value="hombre" ref={this.generoHRef}/> Hombre
                                <input type="radio" name="genero" value="mujer" ref={this.generoMRef}/> Mujer
                                <input type="radio" name="genero" value="otro" ref={this.generoOtroRef}/> Otro
                            </div>

                            <div className="clearfix"></div>

                            <input type="submit" value="Enviar" className="btn btn-success" />

                        </form>
                    </div>
                    <Sidebar
                        blog="false"
                    />
                </div>
            </div>
        );
    }
}

export default Formulario;