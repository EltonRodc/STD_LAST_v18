import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AddOficina, DataDetalleRegistroJefe, DataListaIndicaciones, DataListaOficinasDerivadas, DataListaOficinasPaso1, DataListPopupReferencia, DataListReferencia, DataResponsableOficina, DataTemasJefe, DataTipoDocumentalJefe, DetalleRegistroJefe, ListaIndicaciones, ListaOficinasDerivadas, ListaOficinasPaso1, ListPopupReferencia, ListReferencia, NumeroCorrelativo, OrdenarArchivos, RegistroDocIntOficina, ResponsableOficina, TemasJefe, TipoDocumentalJefe } from '../interfaces/doc-int-of.interface';

@Injectable({
  providedIn: 'root'
})
export class DocIntOfService {

  public api_primary = "http://10.4.0.30:8084/api";
  public api_secondary = "http://10.4.0.30:8085/api";

  private http = inject(HttpClient)

  getTemas(Cdestema:string):Observable<DataTemasJefe[]>{
    const params = new HttpParams()
      .set('Cdestema',Cdestema)
    const urlWithParams = `${this.api_primary}/JefeDocInternoOficina/RegIntComboTema`;
    return this.http.get<TemasJefe>(urlWithParams).pipe(
      map ( (rpta:TemasJefe) => rpta.data)
    )
  }

  getListOficinasPaso1(CodOficina:number):Observable<DataListaOficinasPaso1[]>{
    const params = new HttpParams()
        .set('CodOficina', CodOficina.toString())
    const urlWithParams = `${this.api_primary}/JefeDocInternoOficina/RegIntListaOficina`
    return this.http.get<ListaOficinasPaso1>(urlWithParams, { params: params }).pipe(
        map( (rpta)=> rpta.data)
    )
  }

  getTipoDocumental(CodOficina: number, NumAnio: number): Observable<DataTipoDocumentalJefe[]> {
    const params = new HttpParams()
        .set('CodOficina', CodOficina.toString())
        .set('NumAnio', NumAnio.toString());
    const urlWithParams = `${this.api_primary}/JefeDocInternoOficina/RegIntComboTipoDocumento`;
    return this.http.get<TipoDocumentalJefe>(urlWithParams, { params: params }).pipe(
        map((rpta: TipoDocumentalJefe) => rpta.data)
    );
  }

  getListaResponsableOficina(CodOficina:number):Observable<DataResponsableOficina[]>{
    const params = new HttpParams()
        .set('CodOficina', CodOficina.toString())
    const urlWithParams = `${this.api_primary}/JefeDocInternoOficina/RegIntIfListaTrabajador`
    return this.http.get<ResponsableOficina>(urlWithParams, { params: params }).pipe(
        map( (rpta)=> rpta.data)
    )
}
  getListaTrabajadores(CodOficina:number):Observable<DataResponsableOficina[]>{
      const params = new HttpParams()
          .set('CodOficina', CodOficina.toString())
      const urlWithParams = `${this.api_primary}/JefeDocInternoOficina/RegIntElseListaTrabajador`
      return this.http.get<ResponsableOficina>(urlWithParams, { params: params }).pipe(
          map( (rpta)=> rpta.data)
      )
  }

  getListIndicaciones():Observable<DataListaIndicaciones[]>{
    const urlWithParams = `${this.api_primary}/CombosGenerales/ComboIndicacion`
    return this.http.get<ListaIndicaciones>(urlWithParams).pipe(
        map( (rpta)=> rpta.data)
    )
  }

  getNroCorrelativo(CodTipoDoc:number, CodOficina:number, NumAnio:string, Idusuario:number, Tipo:number): Observable<string> {
    const params = new HttpParams()
        .set('CodTipoDoc', CodTipoDoc.toString())
        .set('CodOficina', CodOficina.toString())
        .set('NumAnio', NumAnio.toString())
        .set('Idusuario', Idusuario.toString())
        .set('Tipo', Tipo.toString());

    const urlWithParams = `${this.api_primary}/JefeDocInternoOficina/RegIntListaCorrelativo`;

    return this.http.get<NumeroCorrelativo>(urlWithParams, { params: params }).pipe(
        tap((rpta: NumeroCorrelativo) => {
            // console.log('Respuesta del servicio:', rpta);
            if (rpta && rpta.data && rpta.data.length > 0) {
                // console.log('Codificación recuperada:', rpta.data[0].codificacion);
            } else {
                // console.error('No se pudo recuperar la codificación.');
            }
        }),
        map((rpta: NumeroCorrelativo) => {
            if (rpta && rpta.data && rpta.data.length > 0) {
                return rpta.data[0].codificacion;
            } else {
                throw new Error('No se pudo recuperar la codificación.');
            }
        })
    );
}

  postRegIntAgregarDocumento(registro: RegistroDocIntOficina):Observable<any>{
    return this.http.post<RegistroDocIntOficina>(`${this.api_primary}/JefeDocInternoOficina/RegIntAgregarDocumento`, registro)
  }

  getListarDetalleDocumentoRegistrado(CodTramite: number): Observable<DataDetalleRegistroJefe> {
    const params = new HttpParams()
      .set('CodTramite', CodTramite.toString());
    const urlWithParams = `${this.api_primary}/JefeDocInternoOficina/RegIntDpuesLisDatosDocumento`;
    return this.http.get<DetalleRegistroJefe>(urlWithParams, { params: params }).pipe(
      map((rpta: DetalleRegistroJefe) => rpta.data[0])
    );
  }

  //Referencias
  listPoputReferencias(textoBuscar:string,tipoBuscar:number,grupoBuscar:number,CodOficinaLogin:number): Observable<DataListPopupReferencia[]> {
    const params = new HttpParams()
        .set('textoBuscar',textoBuscar)
        .set('tipoBuscar',tipoBuscar)
        .set('grupoBuscar',grupoBuscar)
        .set('CodOficinaLogin',CodOficinaLogin)
    return this.http.get<ListPopupReferencia>(`${this.api_secondary}/DocRegComPVD_RCC_Referencia/ListaReferenciaBuscar`, { params }).pipe(
      map((response: ListPopupReferencia) => response.data)
    );
  }
  addReferencias(registro: any): Observable<any> {
    return this.http.post<any>(`${this.api_secondary}/DocRegComPVD_RCC_Referencia/AgregarReferencia`, registro,)
  }

  listReferencia(CodTramite: number): Observable<DataListReferencia[]> {
    const params = new HttpParams().set('CodTramite', CodTramite.toString());
    return this.http.get<ListReferencia>(`${this.api_secondary}/DocRegComPVD_RCC_Referencia/ListaRefTramiteStep2`, { params }).pipe(
      map((response: ListReferencia) => response.data)
    );
  }

  eliminarReferencia(codReferencia: number): Observable<any> {
    return this.http.delete<any>(`${this.api_secondary}/DocRegComPVD_RCC_Referencia/EliminarReferencia`, {
      body: {
        codReferencia: codReferencia
      }
    });
  }

  //Doc Complementario
  listDocComplementarios(CodTramite:number):Observable<any>{
    const params = new HttpParams()
        .set('CodTramite',CodTramite)
    return this.http.get<any>(`${this.api_secondary}/DocRegComPVD_RCC_Complementario/ListaDocComplentarioStep2`,{params})
  }

  cargaEnlaceTramite(body: any): Observable<any> {
      return this.http.put<any>(`${this.api_secondary}/DocRegComPVD_RCC_Complementario/CargaEnlaceTramite`, body);
  }

  cargaArchivoTramite(body: FormData): Observable<any> {
      return this.http.put<FormData>(`${this.api_secondary}/DocRegComPVD_RCC_Complementario/CargaArchivoTramite`, body);
  }

  eliminarDocumentoComplementario(codDigital: number, codUsuario: number): Observable<any> {
      return this.http.delete<any>(`${this.api_secondary}/DocRegComPVD_RCC_Complementario/EliminarDocComplentario`, {
        body: {
          codDigital: codDigital,
          codUsuario: codUsuario,
          editar: true
        }
      });
  }

  ordenarArchivosComplementarios(data: OrdenarArchivos[]):Observable<OrdenarArchivos[]>{
    return this.http.put<OrdenarArchivos[]>(`${this.api_secondary}/DocRegComPVD_RCC_Complementario/RegistroOrdenArchivos`,data)
  }

  listEnvioOficinas(CodTramite:number):Observable<DataListaOficinasDerivadas[]>{
    const params = new HttpParams()
        .set('CodTramite',CodTramite)
    return this.http.get<ListaOficinasDerivadas>(`${this.api_primary}/JefeDocInternoOficina/RegIntDpuesLisEnvioOfcna`,{params}).pipe(
        map ( (rpta)=> rpta.data )
    )
  }

  eliminarOficina(codMovimiento: number, codUsuario: number): Observable<any> {
      return this.http.delete<any>(`${this.api_primary}/JefeDocInternoOficina/RegIntDpuesEliminarEnvioOfcna`, {
        body: {
          codMovimiento: codMovimiento,
          codUsuario: codUsuario,
          editar: 0
        }
      });
  }

  addOficinaDerivada(formOficina:AddOficina):Observable<any>{
      return this.http.post<any>(`${this.api_primary}/JefeDocInternoOficina/RegIntDpuesAgregarOficina`, formOficina)
  }

  updateDocumentoInterno(parteDiario:string,codTramite:number): Observable<any>{
    const credentials = {
        parteDiario,
        codTramite
    };
    return this.http.put(`${this.api_primary}/JefeDocInternoOficina/RegIntDpuesEditarTrmte`, credentials)
}

}
