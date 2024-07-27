import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CoProfesional, DataCoProfesional, DataListTipoDocumentalCoProfes, DataListTrabajadoresCoProfes, DataOficinasCoProfesional, DeleteTrabajador, EditTrabajador, ListTipoDocumentalCoProfes, ListTrabajadoresCoProfes, OficinasCoProfesional, PostAddTrabajador } from '../interfaces/correlativo-profesional.interface';

@Injectable({
  providedIn: 'root'
})
export class CorrelativoProfesionalService {

  public api_primary = "http://10.4.0.30:8084/api";
  private http = inject(HttpClient)

   //Mantenimiento Correlativo Profesional
  getListOficinasCoProfesional():Observable<DataOficinasCoProfesional[]>{
    return this.http.get<OficinasCoProfesional>(`${this.api_primary}/AdministradorCorrelativoProfesional/MntCorrProfesionalListaOficinas`).pipe(
        map( (respose:OficinasCoProfesional) => respose.data)
    )
  }
  getListTipoDocumental(CodOficina:number, CodTrabajador:number, NumAnio:number):Observable<DataListTipoDocumentalCoProfes[]>{
      const params = new HttpParams()
          .set('CodOficina',CodOficina)
          .set('CodTrabajador',CodTrabajador)
          .set('NumAnio',NumAnio)
      const options = { params: params };
      return this.http.get<ListTipoDocumentalCoProfes>(`${this.api_primary}/AdministradorCorrelativoProfesional/MntCorrProfesionalListaTipoDocumento`,options).pipe(
          map( (respose:ListTipoDocumentalCoProfes) => respose.data)
      )
  }
  getCorrelativoProfesional(CodOficina: number, CodTrabajador: number, NumAnio: number):Observable<DataCoProfesional[]>{
      const params = new HttpParams()
          .set('CodOficina',CodOficina)
          .set('CodTrabajador',CodTrabajador)
          .set('NumAnio',NumAnio)
      const options = { params: params };
      return this.http.get<CoProfesional>(`${this.api_primary}/AdministradorCorrelativoProfesional/MntCorrProfesionalListaResultados`, options).pipe(
          map( (response:CoProfesional) => response.data)
      )
  }
  getListTrabjCoProfesional(CodOficina:number):Observable<DataListTrabajadoresCoProfes[]>{
      const params = new HttpParams()
          .set('CodOficina',CodOficina)
      const options = { params: params };
      return this.http.get<ListTrabajadoresCoProfes>(`${this.api_primary}/AdministradorCorrProfesionalTrabajador/MntCorrProfesionalListaTrabajador`,options).pipe(
          map( (respose:ListTrabajadoresCoProfes) => respose.data)
      )
  }
  editarCorrelativos(data: EditTrabajador[]): Observable<EditTrabajador[]> {
      return this.http.put<EditTrabajador[]>(`${this.api_primary}/AdministradorCorrProfesionalTrabajador/MntCorrProfesionalEditarTrabajador`, data);
  }
  postTrabajadorNuevo(body: PostAddTrabajador): Observable<PostAddTrabajador> {
      return this.http.post<PostAddTrabajador>(`${this.api_primary}/AdministradorCorrProfesionalTrabajador/MntCorrProfesionalAgregarTrabajador`, body);
  }
  deleteCorrelativo(codTrabajador: number): Observable<DeleteTrabajador> {
      return this.http.delete<DeleteTrabajador>(`${this.api_primary}/AdministradorCorrProfesionalTrabajador/MntCorrProfesionalEliminarTrabajador`, {
        body: {
          codTrabajador: codTrabajador
        }
      });
  }

}
