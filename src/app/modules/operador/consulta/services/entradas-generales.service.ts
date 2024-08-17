import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ConsultaBandejaEnlace, DataConsultaBandejaEnlace, DataOficinasRcc, DataRegistrador, OficinasRcc, Registrador } from '../interfaces/entradas-generales.interface';

@Injectable({
  providedIn: 'root'
})
export class EntradasGeneralesService {

  public api_primary = "http://10.4.0.30:8084/api";
  public api_secondary = "http://10.4.0.30:8085/api";

  private http = inject(HttpClient)

  getConsultaBandejaEnlace(FechaInicio:string,FechaFin:string,Codificacion:string,Referencia:string,Asunto:string,CodigoTupa:number,
    CodigoTipoDocumento:number,CodigoRegistrador:number,Nombre:string,Remitente:string,CodigoOficinaOrigen:number,
    CodigoOficinaDestino:number,NumeroDocumento:string,CodigoTema:number,CUI:string,Campo:string,Orden:string,NumContrato:string,
    HoraIni:string,HoraFin:string,CodigoTipoRegistroDoc:number
  ):Observable<DataConsultaBandejaEnlace[]>{
    const params = new HttpParams()
      .set('FechaInicio',FechaInicio)
      .set('FechaFin',FechaFin)
      .set('Codificacion',Codificacion)
      .set('Referencia',Referencia)
      .set('Asunto',Asunto)
      .set('CodigoTupa',CodigoTupa)
      .set('CodigoTipoDocumento',CodigoTipoDocumento)
      .set('CodigoRegistrador',CodigoRegistrador)
      .set('Nombre',Nombre)
      .set('Remitente',Remitente)
      .set('CodigoOficinaOrigen',CodigoOficinaOrigen)
      .set('CodigoOficinaDestino',CodigoOficinaDestino)
      .set('NumeroDocumento',NumeroDocumento)
      .set('CodigoTema',CodigoTema)
      .set('CUI',CUI)
      .set('Campo',Campo)
      .set('Orden',Orden)
      .set('NumContrato',NumContrato)
      .set('HoraIni',HoraIni)
      .set('HoraFin',HoraFin)
      .set('CodigoTipoRegistroDoc',CodigoTipoRegistroDoc)

    return this.http.get<ConsultaBandejaEnlace>(`${this.api_secondary}/ConsultaGeneral/BandejaEnlace`,{params}).pipe(
      map ( (rpta)=> rpta.data )
    )
  }

  getComboRegistrador():Observable<DataRegistrador[]>{
    return this.http.get<Registrador>(`${this.api_primary}/CombosGenerales/ComboRegistrador`).pipe(
      map ( (rpta)=> rpta.data )
    )
  }

  getComboOficinasRcc():Observable<DataOficinasRcc[]>{
    return this.http.get<OficinasRcc>(`${this.api_secondary}/DocumentoRegistroRCC/ListaRegistroOficinaRCC`).pipe(
      map ( (rpta)=> rpta.data)
    )
  }


}
