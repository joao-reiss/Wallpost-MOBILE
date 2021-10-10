import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  login : string = "http://api.wallpost.com.br/api/usuario/login";
  register: string = "http://api.wallpost.com.br/api/usuario/cadastro";
  update: string = "http://api.wallpost.com.br/api/usuario/update/";

  constructor(private http: HttpClient) { }
  
  Login($dataUser)
  {
    return this.http.post(`${this.login}`, $dataUser);
  }

  Register($dataUser)
  {
    return this.http.post(`${this.register}`, $dataUser);
  }

  Update(id, value)
  {
    return this.http.put(`${this.update}` + id, value);
  }
  
  dataUser(id)
  {
    return this.http.get("http://api.wallpost.com.br/api/usuario/" + id)
  }

  UpdatePass(id, value)
  {
    return this.http.put("http://api.wallpost.com.br/api/usuario/update/senha/" + id, value)
  }
}
