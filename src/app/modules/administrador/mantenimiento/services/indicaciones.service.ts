import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DataEditIndicacion, DataListIndicaciones, DeleteIndicacion, EditIndicacion, ListIndicaciones, PostAddIndicaciones, PostEditIndicaciones } from '../interfaces/indicaciones.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndicacionesService {

  public api_primary = "http://10.4.0.30:8084/api";
  private http = inject(HttpClient)

  //Mantenimiento Indicacion
  getListIndicaciones(Indicaciones:string):Observable<DataListIndicaciones[]>{
    const params = new HttpParams()
        .set('Indicacion',Indicaciones)
        .set('Orden','')
        .set('Campo','')
    const options = { params: params };
    return this.http.get<ListIndicaciones>(`${this.api_primary}/AdministradorIndicacion/ListaMantenimientoIndicacion`,options).pipe(
        map( (respose:ListIndicaciones) => respose.data)
    )
  }
  postIndicaciones(body: PostAddIndicaciones): Observable<PostAddIndicaciones> {
    return this.http.post<PostAddIndicaciones>(`${this.api_primary}/AdministradorIndicacion/AgregarMantenimientoIndicacion`, body);
  }
  editarIndicaciones(codigo: number, indicacion:string): Observable<PostEditIndicaciones> {
    const body = { codigo: codigo, indicacion: indicacion };
    return this.http.put<PostEditIndicaciones>(`${this.api_primary}/AdministradorIndicacion/EditarMantenimientoIndicacion`, body);
  }
  deleteIndicaciones(codIndicacion: number): Observable<DeleteIndicacion> {
    return this.http.delete<DeleteIndicacion>(`${this.api_primary}/AdministradorIndicacion/EliminarMantenimientoIndicacion`, {
      body: {
        codIndicacion: codIndicacion
      }
    });
  }
  getDetalleIndicacion(CodIndicacion:number):Observable<DataEditIndicacion[]>{
    const params = new HttpParams()
        .set('CodIndicacion',CodIndicacion)
    const options = { params: params };
    return this.http.get<EditIndicacion>(`${this.api_primary}/AdministradorIndicacion/SelEditarIndicacion`,options).pipe(
        map( (respose:EditIndicacion) => respose.data)
    )
  }

}
