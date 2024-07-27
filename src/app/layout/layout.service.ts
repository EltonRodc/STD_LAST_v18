import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataPerfiles, Perfiles } from './layout.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  // public api_primary = environment.URL_PRIMARY;
  public api_primary = "http://10.4.0.30:8084/api";
  private http = inject(HttpClient);

  getPerfiles(IdUsuario:number):Observable<DataPerfiles[]>{
    const params = new HttpParams()
      .set('IdUsuario',IdUsuario)
    const options = { params: params };
    return this.http.get<Perfiles>(`${this.api_primary}/Home/HomePerfiles`,options).pipe(
      map( (respose) => respose.data)
    )
  }

}
