import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataDepartamento, DataDetallePaso2RegistroSalida, DataDistrito, DataInstitucion, DataPaises, DataProvincia, DataSelIntitucion, DataTipoDocumento, Departamento, DetallePaso2RegistroSalida, Distrito, Institucion, Paises, Provincia, RegistroSalidaProfesional, SelInstitucion, TipoDocumento } from '../interfaces/doc-sal-of.interface';

@Injectable({
  providedIn: 'root'
})
export class DocSalidaOfService {

  public api_primary = "http://10.4.0.30:8084/api";
  public api_secondary = "http://10.4.0.30:8085/api";

  private http = inject(HttpClient)

  getTipoDocumento():Observable<DataTipoDocumento[]>{
    const urlWithParams = `${this.api_primary}/JefeDocSalidaOficina/RegSalidaListaTpoDocumento`;
    return this.http.get<TipoDocumento>(urlWithParams).pipe(
      map ( (rpta:TipoDocumento) => rpta.data)
    )
  }

  agregarDocumentoSalidaOficina(registro:RegistroSalidaProfesional):Observable<any>{
    return this.http.post<any>(`${this.api_primary}/JefeDocSalidaOficina/RegSalidaAgregarDocumento`, registro)
  }

  getPais():Observable<DataPaises[]>{
    const urlWithParams = `${this.api_primary}/JefeDocSalidaOficina/RegSalidaListaPais`;
    return this.http.get<Paises>(urlWithParams).pipe(
      map ( (rpta:Paises) => rpta.data)
    )
  }

  getDepartamento():Observable<DataDepartamento[]>{
    const urlWithParams = `${this.api_primary}/JefeDocSalidaOficina/RegSalidaListaDepto`;
    return this.http.get<Departamento>(urlWithParams).pipe(
      map ( (rpta:Departamento) => rpta.data)
    )
  }

  getProvincia(CodDepartamento:string):Observable<DataProvincia[]>{
    const params = new HttpParams()
      .set('CodDepartamento', CodDepartamento)
      return this.http.get<Provincia>(`${this.api_primary}/JefeDocSalidaOficina/RegSalidaListaPrvnc`, { params }).pipe(
        map ( (rpta:Provincia ) => rpta.data)
    )
  }

  getDistrito(CodProvincia:string):Observable<DataDistrito[]>{
    const params = new HttpParams()
      .set('CodProvincia', CodProvincia)
      return this.http.get<Distrito>(`${this.api_primary}/JefeDocSalidaOficina/RegSalidaListaDistr`, { params }).pipe(
        map ( (rpta:Distrito ) => rpta.data)
    )
  }

  getInstitucion(cNombre: string, cSiglaRemitente: string, nNumDocumento: string):Observable<DataInstitucion[]>{
    const params = new HttpParams()
        .set('cNombre',cNombre)
        .set('cSiglaRemitente',cSiglaRemitente)
        .set('nNumDocumento',nNumDocumento)
    const options = { params: params };
    return this.http.get<Institucion>(`${this.api_secondary}/DocRegComPVD_RCC_Remitente/ListaBuscarRemitente`, options).pipe(
        map( (response:Institucion) => response.data)
    )
  }

  getSelInstitucion(CodRemitente: number): Observable<DataSelIntitucion> {
    const params = new HttpParams().set('CodRemitente', CodRemitente.toString());
    return this.http.get<SelInstitucion>(`${this.api_secondary}/DocRegComPVD_RCC_Remitente/ListaSelectRemitente`, { params }).pipe(
      map((response: SelInstitucion) => response.data[0])
    );
  }

  getNroCorrelativoSalida(CodTipoDoc:number,CodOficina:number,Periodo:string,IdUsuario:number,Tipo:number):Observable<any>{
    const params = new HttpParams()
        .set('CodTipoDoc', CodTipoDoc.toString())
        .set('CodOficina', CodOficina.toString())
        .set('Periodo', Periodo.toString())
        .set('IdUsuario', IdUsuario.toString())
        .set('Tipo', Tipo.toString());

    const urlWithParams = `${this.api_primary}/JefeAsistenteConsultas/ListadoCorrelativo`;
    return this.http.get<any>(urlWithParams, { params: params })
  }

  getListDetallePaso2(CodTramite:number):Observable<DataDetallePaso2RegistroSalida>{
    const params = new HttpParams().set('CodTramite', CodTramite.toString());
    return this.http.get<DetallePaso2RegistroSalida>(`${this.api_primary}/JefeDocSalidaOficina/RegSalidaDpuesListaDtsDocumento`, { params }).pipe(
        (map( (rpta)=> rpta.data[0]) )
    )
  }

  updateDocumentoSalida(codTramite:number,observaciones:string, opcion:number, perfil:number): Observable<any>{
    const credentials = {
        codTramite,
        observaciones,
        opcion,
        perfil
    };
    return this.http.put(`${this.api_primary}/JefeDocSalidaOficina/RegSalidaDpuesApbcnDespbcnPerfil`, credentials)
  }
}
