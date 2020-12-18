import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Global } from '../../services/global';
import swal from 'sweetalert';

@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService]
})
export class ArticleEditComponent implements OnInit {

  public article: Article;
  public status: string;
  public is_edit: boolean;
  public page_title: string;
  public url: string;
  
  afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg,.png, .gif, .jpeg',
    maxSize: '50',
    uploadAPI: {
      url: Global.url + 'upload-image'
    },
    theme: 'attachPin',
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube la imagen para el articulo...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService
  ) {
    this.article = new Article('', '', '', null, null);
    this.is_edit = true;
    this.page_title = 'Editar Artículo';
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getArticle();
  }

  onSubmit() {
    this._articleService.update(this.article._id, this.article).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success';
          this.status = response.article;

          swal(
            'Artículo editado',
            'El artículo ha sido editado exitosamente!',
            'success'
          );
          this._router.navigate(['blog']);

        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
        swal(
          'Edición Fallida',
          'El artículo no se ha sido editado correctamente!',
          'error'
        );
        this.status = 'error';
      }
    );
  }

  imageUpload(data){
    // console.log(data.body.image);
    let image_data = data.body.image;
    this.article.image =  image_data;
  }

  getArticle(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._articleService.getArticle(id).subscribe(
        response => {
          if(response.article){
            this.article = response.article;
          } else {
            this._router.navigate(['/home']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/home']);
        });
    });
  }

}
