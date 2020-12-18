import { Injectable } from '@angular/core';
import { Pelicula } from '../models/pelicula';

@Injectable()
      export class PeliculaService{

            public peliculas: Pelicula[];

            constructor(){
                  this.peliculas = [

                        new Pelicula('Spiderman', 2019, '../../assets/images/spiderman.jpg' ),
                        new Pelicula('Avengers', 2018, '../../assets/images/avengers.jpg' ),
                        new Pelicula('Wolverine', 2010, '../../assets/images/wolverine.jpg' )
                      ];
            }

            holaMundo(){
                  return 'Hola Mundo desde servicio peliculas';
            }

            getPeliculas(){
                  return this.peliculas;
            }
      }

