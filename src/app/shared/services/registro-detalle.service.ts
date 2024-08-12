import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataDetalleGeneral, DataDetalleSeguimiento, DataRemitente, DetalleGeneral, DetalleSeguimiento, Remitente } from '../interfaces/registro-detalle.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistroDetalleService {

  public api_secondary = "http://10.4.0.30:8085/api";

  private http = inject(HttpClient)

  getDetalleGeeneral(CodTramite:number):Observable<DataDetalleGeneral>{
    const params = new HttpParams()
    .set('CodTramite',CodTramite)
    const urlWithParams = `${this.api_secondary}/DetTramiteDtosGenerales/ListaDtosGPrincipal`;
    return this.http.get<DetalleGeneral>(urlWithParams, { params: params }).pipe(
      map ( (rpta)=> rpta.data[0] )
    )
  }

  getDetalleRemitente(CodRemitente:number):Observable<Remitente>{
    const params = new HttpParams()
        .set('CodRemitente',CodRemitente)
    const urlWithParams = `${this.api_secondary}/DetTramiteDtosRemitentes/ListaDtosRefPrincipal`;
    return this.http.get<Remitente>(urlWithParams, { params: params })
  }

  getDetalleSeguimiento(CodTramite:number):Observable<DataDetalleSeguimiento[]>{
    const params = new HttpParams()
      .set('CodTramite',CodTramite)
    const urlWithParams = `${this.api_secondary}/DetTramiteSegTramite/ListaSegTrmitePrincipal`;
    return this.http.get<DetalleSeguimiento>(urlWithParams, { params: params }).pipe(
      map ( (rpta)=> rpta.data )
    )
  }

}
