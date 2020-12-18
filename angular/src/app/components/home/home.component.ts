import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from '../../services/article.service';
// import { Global } from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ArticleService]
})
export class HomeComponent implements OnInit {

  public title: string;
  public articles: Article[];
  // public url: string;


  constructor(
    private _articleService: ArticleService
  ) {
    this.title = 'Últimos Artículos';
    // this.url = Global.url;
   }

  ngOnInit(): void {
    this._articleService.getArticles(true).subscribe(
      response => {
        if(response.articles){
          this.articles = response.articles;
          console.log(this.articles);
        }else{}
      },
      error => {
        console.log(error);
      }
    );
  }

}
