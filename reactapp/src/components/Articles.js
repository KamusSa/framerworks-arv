import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Global from '../Global';
import Moment from 'react-moment';
import 'moment/locale/es';


import ImageDefault from '../assets/images/default.jpeg';

class Articles extends Component {

    url = Global.url;

    state = {
        articles: [],
        status: null
    }

    componentWillMount(){
        var home = this.props.home;
        var search = this.props.search;

        if (home === 'true'){
            this.getLastArticles();
        } else if (search && search !== null && search !== undefined){
            this.getArticlesBySearch(search);
        } else {
            this.getArticles();
        }        
    }

    getArticles = () => {
        axios.get(this.url + "articles")
        .then(res => {
            this.setState({
                articles: res.data.articles,
                status: 'success'
            })
          
        })
    }

    getLastArticles = () => {

        axios.get(this.url + "articles/last")
        .then(res => {
            this.setState({
                articles: res.data.articles,
                status: 'success'
            })          
        })
    }

    getArticlesBySearch = (searched) => {

        axios.get(this.url + 'search/' + searched)
        .then(res => {

            this.setState({
            articles: res.data.articles,
            status: 'success'
            })
           
        })
        .catch( err => {
           
            this.setState({
                articles: [],
                status: 'success'
            })
        }) 
    }

    render() {    
        
        if ( this.state.articles.length >= 1) {

            var listArticles = this.state.articles.map((article) => {
                return(
                    <article key={article._id} className="article-item" id="article-template">
                        <div className="image-wrap">
                            { article.image !== null ? (
                                <img src={this.url + 'get-image/' + article.image} alt= {article.title} />
                                ) : (
                                    <img src={ImageDefault} alt= {article.title} />
                                )                                
                            }
                            
                        </div>
    
                        <h2>{article.title}</h2>
                        <span className="date">
                            <Moment local="es" fromNow>{article.date}</Moment>
                        </span>
                        <Link to={'/blog/articulo/' + article._id}>Leer más</Link>

                        <div className="clearfix"></div>
                    </article>
                )
            })
            // Return Principal
            return(
                <div id="articles">
                    {listArticles}
                </div>
            )             
        } else if (this.state.articles.length === 0 && this.state.status === 'success'){
            return(
                <div id="articles">
                    <h1>NO HAY ARTICULOS</h1>
                </div>
            )
        } else {
            return(
                <div id="articles">
                    <h1>CARGANDO</h1>
                </div>
            )
        }
    }
}

export default Articles;