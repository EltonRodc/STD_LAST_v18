import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataDocInterno, DataListCoInterno, DataOficinaCoInterno, DataTipoDocCoInterno, DeleteCoInterno, ListaCoInterno, OficinaCoInterno, PostAddTrabajador, PostCoInterno, SelDataDocInterno, TipoDocCoInterno, UpdateCoInterno } from '../interfaces/correlativo-interno.interface';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CorrelativoInternoService {

    public api_primary = "http://10.4.0.30:8084/api";
    private http = inject(HttpClient)

    //Mantenimiento Correlativo Interno
    getCorrelativoInterno(CodOficina: number, NumAño: number):Observable<DataListCoInterno[]>{
      const params = new HttpParams()
          .set('CodOficina',CodOficina)
          .set('NumAño',NumAño)
      const options = { params: params };
      return this.http.get<ListaCoInterno>(`${this.api_primary}/AdministradorCorrelativoInterno/ListaCorrInterno`, options).pipe(
          map( (response:ListaCoInterno) => response.data)
      )
    }
    getListOficinasCoInterno():Observable<DataOficinaCoInterno[]>{
      return this.http.get<OficinaCoInterno>(`${this.api_primary}/AdministradorCorrInternoOficina/ListadoOfiCorrInterno`).pipe(
          map( (respose:OficinaCoInterno) => respose.data)
      )
    }
    getListTipoDocInterno(CodOficina:number):Observable<DataTipoDocCoInterno[]>{
      const params = new HttpParams()
          .set('CodOficina',CodOficina)
      const options = { params: params };
      return this.http.get<TipoDocCoInterno>(`${this.api_primary}/AdministradorCorrelativoInterno/ListaNvoCorrIntDocumento`,options).pipe(
          map( (respose:TipoDocCoInterno) => respose.data)
      )
    }
    getDataCoInterno(CodOficina:number):Observable<SelDataDocInterno>{
      const params = new HttpParams()
          .set('CodOficina',CodOficina)
      const options = { params: params };
      return this.http.get<DataDocInterno>(`${this.api_primary}/AdministradorCorrInternoOficina/ListaNvoCorrIntOficina`,options).pipe(
          map( (respose:DataDocInterno) => respose.data[0])
      )
    }
    postNeCoInterno(body: PostAddTrabajador): Observable<PostCoInterno> {
      return this.http.post<PostCoInterno>(`${this.api_primary}/AdministradorCorrInternoOficina/MntCorrInternoAgregarOficina`, body);
    }
    editarCoInterno(data: UpdateCoInterno[]): Observable<UpdateCoInterno[]> {
      return this.http.put<UpdateCoInterno[]>(`${this.api_primary}/AdministradorCorrInternoOficina/MntCorrInternoEditarOficina`, data);
    }
    deleteOficinaInterno(codTipoDoc: number, codOficina:number): Observable<DeleteCoInterno> {
      return this.http.delete<DeleteCoInterno>(`${this.api_primary}/AdministradorCorrelativoInterno/EliminarCorrelativoInterno`, {
        body: {
          codTipoDoc: codTipoDoc,
          codOficina:codOficina
        }
      });
    }
}
