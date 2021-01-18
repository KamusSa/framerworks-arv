import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Blog extends Component {
    render() {        
        return (
            <div id="blog">
                <Slider
                    title="Ir al Blog"
                    size="slider-small"

                />
                <div className="center">
                    <div id="content">
                        {/* Listado de articulos que vienen del rest-api */}
                         
                        <Articles />
                    </div>
                    <Sidebar
                        blog="true"
                    />
                </div>
            </div>
        );
    }
}

export default Blog;