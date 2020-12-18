import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Global } from '../../services/global';
import swal from 'sweetalert';


@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers: [ArticleService]
})
export class ArticleNewComponent implements OnInit {

  public article: Article;
  public status: string;
  public page_title: string;
  public is_edit: boolean;
  
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
    private _articleServices: ArticleService
  ) {
    this.article = new Article('', '', '', null, null);
    this.page_title = 'Crear Artículo';
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this._articleServices.create(this.article).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success';
          this.status = response.article;

          // Alerta Sweetalert
          swal(
            'Artículo creado',
            'El artículo ha sido creado exitosamente!',
            'success'
          );

          this._router.navigate(['/blog']);

        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }

  imageUpload(data){
    // console.log(data.body.image);
    let image_data = data.body.image;
    this.article.image =  image_data;
  }
}
