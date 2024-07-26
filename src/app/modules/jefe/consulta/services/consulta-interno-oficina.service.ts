import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataDocumentosAdjuntos, DataListadoComboOficina, DataListadoComboTemas, DataListadoComboTipoDocumento, DataListadoComboTpoDcmto, DataResultadoOficinaInterno, DocumentosAdjuntos, FormularioInternoOficina, ListadoComboOficina, ListadoComboTemas, ListadoComboTipoDocumento, ListadoComboTpoDcmto, ResultadoOficinaInterno } from '../interfaces/consulta';

@Injectable({providedIn: 'root'})
export class ConsultaService {

  public api_primary = "http://10.4.0.30:8084/api";

  constructor(private http:HttpClient) { }

  /*Consulta Interno Oficina*/
  getListadoComboOficinas():Observable<DataListadoComboOficina[]>{
      return this.http.get<ListadoComboOficina>(`${this.api_primary}/JefeConsultaInterOficina/ComboListaOficinas`).pipe(
          map ( (rpta)=> rpta.data )
      )
  }

  getListadoComboTipoDocumento():Observable<DataListadoComboTipoDocumento[]>{
      return this.http.get<ListadoComboTipoDocumento>(`${this.api_primary}/JefeConsultaInterOficina/ComboListaTipoDocumento`).pipe(
          map( (rpta)=> rpta.data)
      )
  }

  getListadoComboTemas():Observable<DataListadoComboTemas[]>{
      return this.http.get<ListadoComboTemas>(`${this.api_primary}/CombosGenerales/ComboTema`).pipe(
          map( (rpta)=> rpta.data)
      )
  }

  getConsultaInternoOficina(formularioInternoOficina: FormularioInternoOficina): Observable<DataResultadoOficinaInterno[]> {
      const params = {
        fDesde: formularioInternoOficina.fDesde,
        fHasta: formularioInternoOficina.fHasta,
        SI: formularioInternoOficina.SI.toString(),
        NO: formularioInternoOficina.NO.toString(),
        nTramite: formularioInternoOficina.nTramite,
        cCodificacion: formularioInternoOficina.cCodificacion,
        Asunto: formularioInternoOficina.Asunto,
        Observaciones: formularioInternoOficina.Observaciones,
        CodTipoDoc: formularioInternoOficina.CodTipoDoc.toString(),
        CodOficina: formularioInternoOficina.CodOficina.toString(),
        CodOficinaLogin: formularioInternoOficina.CodOficinaLogin.toString(),
        CodTema: formularioInternoOficina.CodTema.toString(),
        Regini: formularioInternoOficina.Regini.toString(),
        Size: formularioInternoOficina.Size.toString(),
      };
      return this.http.get<ResultadoOficinaInterno>(`${this.api_primary}/JefeConsultaInterOficina/ConsultaInterOficinaLista`, { params: params }).pipe(
        map(rpta => rpta.data)
      );
  }

  getDocumentosAdjuntos(CodTramite:number):Observable<DataDocumentosAdjuntos[]>{
      const params = new HttpParams()
          .set('CodTramite',CodTramite.toString())
      return this.http.get<DocumentosAdjuntos>(`${this.api_primary}/JefeConsultaInterOficina/CnstaInterDetalleAdjunto`,{params}).pipe(
          map ( (rpta) => rpta.data)
      )
  }

  /*Consulta Salida Oficina*/
  getListadoCombTpoDcmto():Observable<DataListadoComboTpoDcmto[]>{
      return this.http.get<ListadoComboTpoDcmto>(`${this.api_primary}/JefeDocSalidaOficina/RegSalidaListaTpoDocumento`).pipe(
          map ( (rpta)=> rpta.data )
      )
  }

    // getConsultaSalidaOficina(formularioSalidaOficina: FormularioSalidaOficina): Observable<DataResultadoOficinaInterno[]> {
    //     const params = {
    //       fDesde: formularioInternoOficina.fDesde,
    //       fHasta: formularioInternoOficina.fHasta,
    //       SI: formularioInternoOficina.SI.toString(),
    //       NO: formularioInternoOficina.NO.toString(),
    //       nTramite: formularioInternoOficina.nTramite,
    //       cCodificacion: formularioInternoOficina.cCodificacion,
    //       Asunto: formularioInternoOficina.Asunto,
    //       Observaciones: formularioInternoOficina.Observaciones,
    //       CodTipoDoc: formularioInternoOficina.CodTipoDoc.toString(),
    //       CodOficina: formularioInternoOficina.CodOficina.toString(),
    //       CodOficinaLogin: formularioInternoOficina.CodOficinaLogin.toString(),
    //       CodTema: formularioInternoOficina.CodTema.toString(),
    //       Regini: formularioInternoOficina.Regini.toString(),
    //       Size: formularioInternoOficina.Size.toString(),
    //     };
    //     return this.http.get<ResultadoOficinaInterno>(`${this.apiMaestra}/api/JefeConsultaInterOficina/ConsultaInterOficinaLista`, { params: params }).pipe(
    //       map(rpta => rpta.data)
    //     );
    // }
}
