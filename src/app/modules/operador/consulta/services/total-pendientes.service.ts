import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataOficinasCoIntenos, DataPendientes, OficinasCoIntenos, Pendientes } from '../interfaces/total-pendientes.interface';

@Injectable({
  providedIn: 'root'
})
export class TotalPendientesService {

  public api_primary = "https://desarrollo02.proviasdes.gob.pe:9122/api";
  public api_secondary = "https://desarrollo02.proviasdes.gob.pe:9121/api";

 private http = inject(HttpClient)

 getOfiCoInterno():Observable<DataOficinasCoIntenos[]>{
  return this.http.get<OficinasCoIntenos>(`${this.api_primary}/AdministradorCorrInternoOficina/ListadoOfiCorrInterno`).pipe(
    map ( (rpta)=> rpta.data )
  )
 }

  getTotaPendientes(fDesde:string,fHasta:string,Entrada:number,Interno:number,Salida:number,
    Anexo:number,Codificacion:string,Asunto:string,CodTipoDoc:number,CodTrabajadorResponsable:number,
    CodTrabajadorDelegado:number,CodTema:number,EstadoMov:number,Aceptado:number,SAceptado:number,
    CodOficinaLogin:number,Columna:string,Idir:string,Remitente:number
  ):Observable<DataPendientes[]>{
    const params = new HttpParams()
      .set('fDesde',fDesde)
      .set('fHasta',fHasta)
      .set('Entrada',Entrada)
      .set('Interno',Interno)
      .set('Salida',Salida)
      .set('Anexo',Anexo)
      .set('Codificacion',Codificacion)
      .set('Asunto',Asunto)
      .set('CodTipoDoc',CodTipoDoc)
      .set('CodTrabajadorResponsable',CodTrabajadorResponsable)
      .set('CodTrabajadorDelegado',CodTrabajadorDelegado)
      .set('CodTema',CodTema)
      .set('EstadoMov',EstadoMov)
      .set('Aceptado',Aceptado)
      .set('SAceptado',SAceptado)
      .set('CodOficinaLogin',CodOficinaLogin)
      .set('Columna',Columna)
      .set('Idir',Idir)
      .set('Remitente',Remitente)
    return this.http.get<Pendientes>(`${this.api_secondary}/ConsultaGeneral/ListaTotalPendientes`,{params}).pipe(
      map ( (rpta)=> rpta.data )
    )
  }

}
