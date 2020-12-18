import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../models/pelicula';
import { PeliculaService} from '../../services/pelicula.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
  providers: [PeliculaService]
})
export class PeliculasComponent implements OnInit {

  public titulo: string;
  public peliculas: Pelicula[];
  public favorita: Pelicula;
  public fecha: any;


  constructor(
    private _peliculaService: PeliculaService

  ) {
    this.titulo = 'Componente Películas';
    this.peliculas = this._peliculaService.getPeliculas();
  }

  ngOnInit(): void {
    console.log(this.peliculas); 
    console.log(this._peliculaService.holaMundo());
    
  }

  mostrarFavorita(event) {
    
    // console.log(event);
    
    this.favorita = event.pelicula;
  }

}
