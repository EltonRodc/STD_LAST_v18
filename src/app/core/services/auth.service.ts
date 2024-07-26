import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Auth, DataAuth } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // public api_primary = environment.URL_PRIMARY;
  public api_primary = "http://10.4.0.30:8084/api";
  private http = inject(HttpClient);

  authLogin(UniqueCode:string, sistemaId:number):Observable<DataAuth>{
    const params = new HttpParams()
    .set('UniqueCode',UniqueCode)
    .set('sistemaId',sistemaId)
    const urlWithParams = `${this.api_primary}/HomeLogin/LoginIntegrarPAU`;

    return this.http.get<Auth>(urlWithParams, { params }).pipe(
        map ( (rpta)=> rpta.value.data[0])
    )
}
}
