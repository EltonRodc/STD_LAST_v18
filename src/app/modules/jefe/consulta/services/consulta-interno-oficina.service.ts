import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ComboDepartamento, ComboDistritos, ComboOfcnOrigen, ComboProvincias, ComboTpoDcmto, DataComboDepartamento, DataComboDistritos, DataComboOfcnOrigen, DataComboProvincias, DataComboTpoDcmto, DataDocumentosAdjuntos, DataListadoComboOficina, DataListadoComboTemas, DataListadoComboTipoDocumento, DataListadoComboTpoDcmto, DataListadoControlCargos, DataResultadoOficinaInterno, DocumentosAdjuntos, FormularioControlCargos, FormularioInternoOficina, ListadoComboOficina, ListadoComboTemas, ListadoComboTipoDocumento, ListadoComboTpoDcmto, ListadoControlCargos, ResultadoOficinaInterno } from '../interfaces/consulta';

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



    /*Consulta Control Cargos*/
    getConsultaControlCargos(formularioControlCargos: FormularioControlCargos): Observable<DataListadoControlCargos[]> {
        const params = {
            fDesde: formularioControlCargos.fDesde,
            fHasta: formularioControlCargos.fHasta,
            ChxfRespuesta: formularioControlCargos.ChxfRespuesta,
            fEntrega: formularioControlCargos.fEntrega,
            Codificacion: formularioControlCargos.Codificacion.toString(),
            Nombre: formularioControlCargos.Nombre.toString(),
            Idireccion: formularioControlCargos.Idireccion.toString(),
            CodTipoDoc: formularioControlCargos.CodTipoDoc.toString(),
            NumGuiaservicio: formularioControlCargos.NumGuiaservicio.toString(),
            FlgUrgente: formularioControlCargos.FlgUrgente.toString(),
            CodTrabajadorEnvio: formularioControlCargos.CodTrabajadorEnvio.toString(),
            FlgLocal: formularioControlCargos.FlgLocal.toString(),
            FlgNacional: formularioControlCargos.FlgNacional.toString(),
            FlgInternacional: formularioControlCargos.FlgInternacional.toString(),
            CodOficina: formularioControlCargos.CodOficina.toString(),
            FlgEstado: formularioControlCargos.FlgEstado.toString(),
            CodDepartamento: formularioControlCargos.CodDepartamento,
            CodProvincia: formularioControlCargos.CodProvincia.toString(),
            CodDistrito: formularioControlCargos.CodDistrito,
            Columna: formularioControlCargos.Columna,
            Idir: formularioControlCargos.Idir,
        };
        return this.http.get<ListadoControlCargos>(`${this.api_primary}/JefeConsultaCompartido/ListaControlCargos`, { params: params }).pipe(
            map(rpta => rpta.data)
        );
    }

    getListadoComboTpoDcmto():Observable<DataComboTpoDcmto[]>{
        return this.http.get<ComboTpoDcmto>(`${this.api_primary}/CombosGenerales/ComboTpoDocumento`).pipe(
            map ( (rpta)=> rpta.data )
        )
    }

    getListadoComboOfcnOrigen():Observable<DataComboOfcnOrigen[]>{
        return this.http.get<ComboOfcnOrigen>(`${this.api_primary}/AdministradorCorrelativoProfesional/MntCorrProfesionalListaOficinas`).pipe(
            map ( (rpta)=> rpta.data )
        )
    }

    getListadoComboDepartamento():Observable<DataComboDepartamento[]>{
        return this.http.get<ComboDepartamento>(`${this.api_primary}/JefeDocSalidaOficina/RegSalidaListaDepto`).pipe(
            map ( (rpta)=> rpta.data )
        )
    }

    getListadoComboProvincias(CodDepartamento:string):Observable<DataComboProvincias[]>{
        const params = new HttpParams()
        .set('CodDepartamento',CodDepartamento)
        return this.http.get<ComboProvincias>(`${this.api_primary}/JefeDocSalidaOficina/RegSalidaListaPrvnc`,{params}).pipe(
            map ( (rpta)=> rpta.data )
        )
    }

    getListadoComboDistritos():Observable<DataComboDistritos[]>{
        return this.http.get<ComboDistritos>(`${this.api_primary}/JefeConsultaCompartido/ListaComboDistrito`).pipe(
            map ( (rpta)=> rpta.data )
        )
    }

}
