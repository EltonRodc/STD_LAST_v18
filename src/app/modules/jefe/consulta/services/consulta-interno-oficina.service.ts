import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CmbSalDireccion, CmbTpoDcmto, ComboDepartamento, ComboDistritos, ComboOfcnOrigen, ComboProvincias, ComboTpoDcmto, DataCmbSalDireccion, DataCmbTpoDcmto, DataComboDepartamento, DataComboDistritos, DataComboOfcnOrigen, DataComboProvincias, DataComboTpoDcmto, DataDocumentosAdjuntos, DataListadoAlertas, DataListadoComboOficina, DataListadoComboTemas, DataListadoComboTipoDocumento, DataListadoComboTpoDcmto, DataListadoControlCargos, DataListadoControlCargosOfi, DataListadoDocInternoGeneral, DataListadoDocSalida, DataListadoPlazoVencidos, DataResultadoOficinaInterno, DocumentosAdjuntos, FormularioAlertas, FormularioControlCargos, FormularioControlCargosOfi, FormularioDocInternoGeneral, FormularioDocumentoSalida, FormularioInternoOficina, FormularioPlazoVencidos, ListadoAlertas, ListadoComboOficina, ListadoComboTemas, ListadoComboTipoDocumento, ListadoComboTpoDcmto, ListadoControlCargos, ListadoControlCargosOfi, ListadoDocInternoGeneral, ListadoDocSalida, ListadoPlazoVencidos, ResultadoOficinaInterno } from '../interfaces/consulta';

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
    getConsultaSalidaOficina(formularioDocumentoSalida: FormularioDocumentoSalida): Observable<DataListadoDocSalida[]> {
    const params = {
    fDesde: formularioDocumentoSalida.fDesde,
    fHasta: formularioDocumentoSalida.fHasta,
    RespuestasI: formularioDocumentoSalida.RespuestasI.toString(),
    RespuestaNO: formularioDocumentoSalida.RespuestaNO.toString(),
    Codificacion: formularioDocumentoSalida.Codificacion,
    Asunto: formularioDocumentoSalida.Asunto,
    Observaciones: formularioDocumentoSalida.Observaciones,
    CodTipoDoc: formularioDocumentoSalida.CodTipoDoc.toString(),
    cNombre: formularioDocumentoSalida.cNombre.toString(),
    Respuesta: formularioDocumentoSalida.Respuesta.toString(),
    RegistroPersonal: formularioDocumentoSalida.RegistroPersonal.toString(),
    RegistroSolicitado: formularioDocumentoSalida.RegistroSolicitado.toString(),
    CodOficinaLogin: formularioDocumentoSalida.CodOficinaLogin.toString(),
    Columna: formularioDocumentoSalida.Columna,
    Idir: formularioDocumentoSalida.Idir,
    NTramite: formularioDocumentoSalida.NTramite,
    Referencia: formularioDocumentoSalida.Referencia.toString()
    };
    return this.http.get<ListadoDocSalida>(`${this.api_primary}/JefeConsultaDocSalidaOfi/ListaConsultaSalida`, { params: params }).pipe(
    map(rpta => rpta.data)
    );
    }

    getListadoComboDireccion(CodTramite:string):Observable<DataCmbSalDireccion[]>{
    const params = new HttpParams()
    .set('CodTramite',CodTramite)
    return this.http.get<CmbSalDireccion>(`${this.api_primary}/JefeConsultaDocSalidaOfi/ListaDircnSalida`,{params}).pipe(
    map ( (rpta)=> rpta.data )
    )
    }

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
    return this.http.get<ListadoControlCargos>(`${this.api_primary}/JefeConsultaControlCargos/ListaControlCargos`, { params: params }).pipe(
    map(rpta => rpta.data)
    );
    }

    getListadoComboTpoDcmto():Observable<DataComboTpoDcmto[]>{
    return this.http.get<ComboTpoDcmto>(`${this.api_primary}/JefeDocSalidaOficina/RegSalidaListaTpoDocumento`).pipe(
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

    getListadoComboDistritos(CodProvincia:string):Observable<DataComboDistritos[]>{
    const params = new HttpParams()
    .set('CodProvincia',CodProvincia)
    return this.http.get<ComboDistritos>(`${this.api_primary}/JefeDocSalidaOficina/RegSalidaListaDistr`,{params}).pipe(
    map ( (rpta)=> rpta.data )
    )
    }
    /*Consulta Interno General*/
    getConsultaInternoGeneral(FormularioDocInternoGeneral: FormularioDocInternoGeneral): Observable<DataListadoDocInternoGeneral[]> {
        const params = {
        fDesde: FormularioDocInternoGeneral.fDesde,
        fHasta: FormularioDocInternoGeneral.fHasta,
        SI: FormularioDocInternoGeneral.SI,
        NO: FormularioDocInternoGeneral.NO,
        Codificacion: FormularioDocInternoGeneral.Codificacion,
        NroDocumento: FormularioDocInternoGeneral.NroDocumento,
        Asunto: FormularioDocInternoGeneral.Asunto,
        Observaciones: FormularioDocInternoGeneral.Observaciones,
        CodTipoDoc: FormularioDocInternoGeneral.CodTipoDoc.toString(),
        CodOficinaori: FormularioDocInternoGeneral.CodOficinaori.toString(),
        CodOficinaDes: FormularioDocInternoGeneral.CodOficinaDes.toString(),
        CodTema: FormularioDocInternoGeneral.CodTema.toString(),
        Gerencia: FormularioDocInternoGeneral.Gerencia.toString(),
        Regini: FormularioDocInternoGeneral.Regini.toString(),
        ParteDiario: FormularioDocInternoGeneral.ParteDiario,
        CUI: FormularioDocInternoGeneral.CUI,
        Size: FormularioDocInternoGeneral.Size.toString(),
        };
        return this.http.get<ListadoDocInternoGeneral>(`${this.api_primary}/JefeConsultaCompartido/ListaInternoGnral`, { params: params }).pipe(
        map(rpta => rpta.data)
        );
    }

    /*Consulta Control Cargos Oficinas*/
    getConsultaControlCargosOfi(FormularioControlCargosOfi: FormularioControlCargosOfi): Observable<DataListadoControlCargosOfi[]> {
        const params = {
        fDesde: FormularioControlCargosOfi.fDesde,
        fHasta: FormularioControlCargosOfi.fHasta,
        ChxfRespuesta: FormularioControlCargosOfi.ChxfRespuesta,
        fEntrega: FormularioControlCargosOfi.fEntrega,
        Codificacion: FormularioControlCargosOfi.Codificacion.toString(),
        Nombre: FormularioControlCargosOfi.Nombre.toString(),
        Direccion: FormularioControlCargosOfi.Direccion.toString(),
        CodTipoDoc: FormularioControlCargosOfi.CodTipoDoc.toString(),
        NumGuiaservicio: FormularioControlCargosOfi.NumGuiaservicio.toString(),
        FlgUrgente: FormularioControlCargosOfi.FlgUrgente.toString(),
        CodTrabajadorEnvio: FormularioControlCargosOfi.CodTrabajadorEnvio.toString(),
        FlgLocal: FormularioControlCargosOfi.FlgLocal.toString(),
        FlgNacional: FormularioControlCargosOfi.FlgNacional.toString(),
        FlgInternacional: FormularioControlCargosOfi.FlgInternacional.toString(),
        CodOficina: FormularioControlCargosOfi.CodOficina.toString(),
        FlgEstado: FormularioControlCargosOfi.FlgEstado.toString(),
        CodDepartamento: FormularioControlCargosOfi.CodDepartamento,
        CodProvincia: FormularioControlCargosOfi.CodProvincia.toString(),
        CodDistrito: FormularioControlCargosOfi.CodDistrito.toString(),
        Columna: FormularioControlCargosOfi.Columna,
        Idir: FormularioControlCargosOfi.Idir,
        CodOficinaLogin: FormularioControlCargosOfi.CodOficinaLogin,
        };
        return this.http.get<ListadoControlCargosOfi>(`${this.api_primary}/JefeConsultaControlCargos/ListaControlCargosOficina`, { params: params }).pipe(
        map(rpta => rpta.data)
        );
    }

    /*Consulta Plazo Vencidos*/
    getConsultaPlazoVencidos(FormularioPlazoVencidos: FormularioPlazoVencidos): Observable<DataListadoPlazoVencidos[]> {
        const params = {
        fDesde: FormularioPlazoVencidos.fDesde,
        fHasta: FormularioPlazoVencidos.fHasta,
        Codificacion: FormularioPlazoVencidos.Codificacion.toString(),
        ChxfRespuesta: FormularioPlazoVencidos.Codificacion,
        NroDocumento: FormularioPlazoVencidos.NroDocumento.toString(),
        Asunto: FormularioPlazoVencidos.Asunto.toString(),
        CodTupa: FormularioPlazoVencidos.CodTupa.toString(),
        CodTipoDoc: FormularioPlazoVencidos.CodTipoDoc.toString(),
        CodOficinario: FormularioPlazoVencidos.CodOficinario.toString(),
        CodOficinaDes: FormularioPlazoVencidos.CodOficinaDes.toString(),
        CodTrabajadoresponsable: FormularioPlazoVencidos.CodTrabajadoresponsable.toString(),
        CodTema: FormularioPlazoVencidos.CodTema.toString(),
        InicioPagina: FormularioPlazoVencidos.InicioPagina,
        SizePagina: FormularioPlazoVencidos.SizePagina,
        };
        return this.http.get<ListadoPlazoVencidos>(`${this.api_primary}/JefeConsultaPlazosVencidos/CnstaPlzosVncdosLista`, { params: params }).pipe(
        map(rpta => rpta.data)
        );
    }

    getListadoCbmbTpoDcmto():Observable<DataCmbTpoDcmto[]>{
        return this.http.get<CmbTpoDcmto>(`${this.api_primary}/CombosGenerales/ComboTpoDocumento`).pipe(
            map( (rpta)=> rpta.data)
        )
    }

    /*Consulta Alertas*/
    getConsultaAlertas(FormularioPlazoVencidos: FormularioAlertas): Observable<DataListadoAlertas[]> {
    const params = {
        fDesde: FormularioPlazoVencidos.fDesde,
        fHasta: FormularioPlazoVencidos.fHasta,
        Codificacion: FormularioPlazoVencidos.Codificacion.toString(),
        ChxfRespuesta: FormularioPlazoVencidos.Codificacion,
        NroDocumento: FormularioPlazoVencidos.NroDocumento.toString(),
        Asunto: FormularioPlazoVencidos.Asunto.toString(),
        CodTupa: FormularioPlazoVencidos.CodTupa.toString(),
        CodTipoDoc: FormularioPlazoVencidos.CodTipoDoc.toString(),
        CodOficinaOri: FormularioPlazoVencidos.CodOficinaOri.toString(),
        CodOficinaDes: FormularioPlazoVencidos.CodOficinaDes.toString(),
        CodTrabajadoresponsable: FormularioPlazoVencidos.CodTrabajadoresponsable.toString(),
        Columna: FormularioPlazoVencidos.Columna,
        Idir: FormularioPlazoVencidos.Idir,
        };
        return this.http.get<ListadoAlertas>(`${this.api_primary}/JefeConsultaAlertas/ListaAlerta`, { params: params }).pipe(
        map(rpta => rpta.data)
        );
    }

}
