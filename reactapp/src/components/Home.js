import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Home extends Component {
    render() {
        var buttonString = "Ir al Blog";
        return (
            <div id="home">
                <Slider
                    title="Bienvenido al Curso de React"
                    btn={buttonString}
                    size="small-big"
                />
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Últimos Artículos</h1>
                        <Articles
                            home='true'
                        />
                    </div>
                    <Sidebar />
                </div>
            </div>
        );
    }
}

export default Home;