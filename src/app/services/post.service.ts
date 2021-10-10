import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  all : string = "http://api.wallpost.com.br/api/posts";
  dtPost: string = "http://api.wallpost.com.br/api/post/";

  constructor(private httpClient: HttpClient) { }

  public getDataPost()
  {
     return this.httpClient.get(`${this.all}`);
  }

  getDataPostById(id)
  {
    return this.httpClient.get(`${this.dtPost}` + id);
  }
}
