import React from 'react';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';

// Importación componentes.
import MiComponente from './components/MiComponente';
import Header from './components/Header';



function holaMundo(nombre, edad){
  var presentacion = (
    <div>
      <h2>Hola, soy {nombre}</h2>
      <h3>Tengo {edad} años</h3>
    </div>
  ); 
  
  
  return presentacion;
}

function App() {

  var nombre = 'Luis Antonio';
  


  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bienvenido al Curso de React
        </p>
        {holaMundo(nombre, 43)}
        <section className="componentes">
          <MiComponente/>
          <MiComponente/>
          <MiComponente/>
          <MiComponente/>
        </section>
        
      </header>
    </div>
  );
}

export default App;
