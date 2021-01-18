import React, { Component } from 'react';

import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import Global from '../Global';
import Sidebar from './Sidebar';
import Moment from 'react-moment'
import 'moment/locale/es-mx'
import ImageDefault from '../assets/images/default.jpeg';

class Article extends Component {

    url = Global.url;

    state = {
        article: false,
        status: null
    }

    getArticle = () => {
        var id = this.props.match.params.id;

        axios.get(this.url + 'article/' + id)
            .then(res => {

                this.setState({
                    article: res.data.article,
                    status: 'success'
                })
            })
    }

    componentWillMount() {
        this.getArticle();
    }

    deleteArticle = (id) => {

        swal({
            title: "Está seguro de eliminar este artículo?",
            text: "Una vez eliminado no podrá recuperar la información",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(this.url + 'article/' + id)
                        .then(res => {
                            this.setState({
                                article: res.data.article,
                                status: 'deleted'
                            })

                            swal(
                                'Artículo Eliminado',
                                'Artículo eliminado correctamente',
                                'success'
                            )
                        })
                } else {
                    swal(
                        'Tranquilo el artículo no fué eliminado',
                        'El artículo no fue eliminado',
                        'success'
                    )
                }
            });
    }

    render() {

        if (this.state.status === 'deleted') {
            return <Redirect to="/blog" />
        }

        var article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    {this.state.article &&
                        <article className="article-item article-detail">
                            <div className="image-wrap">
                                {article.image !== null ? (
                                    <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                                ) : (
                                        <img src={ImageDefault} alt={article.title} />
                                    )
                                }
                            </div>

                            <h1 className="subheader">{article.title}</h1>
                            <span className="date">
                                <Moment local="es" fromNow>{article.date}</Moment>
                            </span>
                            <p>
                                {article.content}
                            </p>


                            <Link to={'/blog/editar/' + article._id} className="btn btn-warning">Editar</Link>
                            
                            <button onClick={
                                () => {
                                    this.deleteArticle(article._id)
                                }
                            } className="btn btn-danger">Eliminar</button>


                            <div className="clearfix"></div>
                        </article>
                    }

                    {!this.state.article &&
                        <div id="article">
                            <h2 className="subheader">El artículo no existe</h2>
                            <p>Intentalo de nuevo mas tarde</p>
                        </div>

                    }

                    {this.state.status == null &&
                        <div id="article">
                            <h2 className="subheader">Cargando</h2>
                            <p>Espere un momento</p>
                        </div>

                    }


                </section>
                <Sidebar />

            </div>
        )
    }
}


export default Article;