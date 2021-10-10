import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MuralService {

  id: any = localStorage.getItem('idmural')

  api : string = "http://api.wallpost.com.br/api/murais/vinculados/";
  api2 : string = "http://api.wallpost.com.br/api/mural/";
  

  constructor(private httpClient : HttpClient) { }

      public getDataMural(id)
      {
        return this.httpClient.get(`${this.api}` + id);
        // .pipe(map((data => JSON.stringify(data))));
      }

      public getDataMuralById(id)
      {
        return this.httpClient.get(`${this.api2}` + id + "/posts");   
      }

      public vincularMural(id)
      {
        return this.httpClient.get("http://api.wallpost.com.br/api/murais/vinculados/" + id); 
      }

      public chaveAcesso(cd_chave)
      {
        return this.httpClient.post("http://api.wallpost.com.br/api/mural/chave", cd_chave);
      }


      public destroyAcesso(id)
      {

        return this.httpClient.post("http://api.wallpost.com.br/api/mural/desvincular", id);

      }

      public addAcesso(id)
      {
        return this.httpClient.post("http://api.wallpost.com.br/api/mural/vincular", id);
      }

      public QrCode(value)
      {
        return this.httpClient.post("http://api.wallpost.com.br/api/mural/qrcode", value);
      }

}
