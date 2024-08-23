import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Adjuntos, DataAdjuntos, DataDetalleGeneral, DataDetalleSeguimiento, DataRemitente, DetalleGeneral, DetalleSeguimiento, Remitente } from '../interfaces/registro-detalle.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistroDetalleService {

  public api_secondary = "https://desarrollo02.proviasdes.gob.pe:9121/api";

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

  getDocAdjuntos(CodTramite:number):Observable<DataAdjuntos[]>{
    const params = new HttpParams()
      .set('CodTramite',CodTramite)
    const urlWithParams = `${this.api_secondary}/DetTramiteDtosGenerales/ListaDtosGAdjuntos`;
    return this.http.get<Adjuntos>(urlWithParams, { params: params }).pipe(
      map ( (rpta)=> rpta.data )
    )
  }

}
