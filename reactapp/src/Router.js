import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Error from './components/Error';
import MiComponente from './components/MiComponente';
import Formulario from './components/Formulario';
import Peliculas from './components/Peliculas';

import Header from './components/Header';

import Footer from './components/Footer';
// import SeccionPruebas from './components/SeccionPruebas';
import Home from './components/Home';
import Blog from './components/Blog';
import Search from './components/Search';
import Article from './components/Article';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header />


                {/* Configurar rutas y páginas */}
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/home' component={Home} />
                    <Route exact path='/blog' component={Blog} />
                    <Route exact path='/blog/articulo/:id' component={Article}/>
                    <Route exact path='/blog/editar/:id' component={EditArticle}/>
                    <Route exact path='/blog/crear' component={CreateArticle}/>

                    <Route exact path='/blog/busqueda/:search' component={Search} />
                    <Route exact path='/redirect/:search' render={
                        (props) => {
                            var search = props.match.params.search;
                            return (
                                <Redirect to={'/blog/busqueda/' + search} />
                            )
                        }
                    }
                    />

                    <Route exact path='/peliculas' component={Peliculas} />
                    <Route exact path='/formulario' component={Formulario} />
                    
                    
                    <Route exact path='/segunda-ruta' component={MiComponente} />
                    <Route exact path='/pagina-1' render={() => (
                        <h1>Hola desde PAGINA 1</h1>
                    )} />

                    <Route exact path='/prueba/:nombre/:apellido?' render={(props) => {
                        var nombre = props.match.params.nombre;
                        var apellido = props.match.params.apellido;
                        return (
                            <div className="content">
                                <h1 className="subheader">Hola desde PAGINA PRUEBA</h1>
                                <h2>
                                    {nombre && !apellido &&
                                        nombre
                                    }
                                    {nombre && apellido &&
                                        <span>{nombre} {apellido} </span>
                                    }
                                </h2>
                            </div>
                        )
                    }
                    } />

                    {<Route component={Error} />}

                </Switch>


                <div className="clearfix"></div>


                <Footer />
            </BrowserRouter>
        );
    }
}

export default Router;