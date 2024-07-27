import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataDetalleMensajeria, DataListMensajeria, DataListOfcnaDestino, DetalleMensajeria, ListMensajeria, ListOfcnaDestino, PostAddMensajeria, UpdateMensajeria } from '../interfaces/mensajeria.interface';

@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {

  public api_primary = "http://10.4.0.30:8084/api";
  private http = inject(HttpClient)

  getListMensajeria(EstadoMensaje:number):Observable<DataListMensajeria[]>{
      const params = new HttpParams()
          .set('EstadoMensaje',EstadoMensaje)
      const options = { params: params };
      return this.http.get<ListMensajeria>(`${this.api_primary}/AdministradorMensaje/ListaMantenimientoMensaje`,options).pipe(
          map( (respose:ListMensajeria) => respose.data)
      )
  }
  postMensajeria(body: PostAddMensajeria): Observable<PostAddMensajeria> {
      return this.http.post<PostAddMensajeria>(`${this.api_primary}/AdministradorMensaje/AgregarMantenimientoMensaje`, body);
  }
  getListOficinaDestino():Observable<DataListOfcnaDestino[]>{
      return this.http.get<ListOfcnaDestino>(`${this.api_primary}/AdministradorCorrelativoProfesional/MntCorrProfesionalListaOficinas`).pipe(
          map( (respose:ListOfcnaDestino) => respose.data)
      )
  }
  getDetalleMensajeria(CodMensajeria:number):Observable<DataDetalleMensajeria>{
      const params = new HttpParams()
          .set('CodMensajeria', CodMensajeria.toString())
          const urlWithParams = `${this.api_primary}/AdministradorMensaje/LisSelMantenimientoMensaje`;
      return this.http.get<DetalleMensajeria>(urlWithParams, { params }).pipe(
          map ( (rpta)=> rpta.data[0] )
      )
  }
  updateMensajeria(registro:UpdateMensajeria):Observable<any>{
      return this.http.put<any>(`${this.api_primary}/AdministradorMensaje/EditarMantenimientoMensaje`, registro)
  }
}
