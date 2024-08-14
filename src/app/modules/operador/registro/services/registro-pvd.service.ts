import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ComboIndicaciones, ComboTemas, ComboTipoDocumental, DataComboIndicaciones, DataComboTemas, DataComboTipoDocumental, DataDocumentoRegistrado, DataOficinaDetalle, DataOficinasCopias, DataOficinasDerivadas, DataRegistroPVD_Id_Tramite, DataRepresentante, DocumentoRegistrado, ListaContratos, OficinaDetalle, OficinasCopias, OficinasDerivadas, PostOficinaCopia, RegistroPVD, RegistroPVD_Id_Tramite, Representante } from '../interfaces/registro-pvd.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroPvdService {

  public api_primary = "http://10.4.0.30:8084/api";
  public api_secondary = "http://10.4.0.30:8085/api";
  public api_maestra = "http://10.4.0.30:8083/api";
  public api_sgd = "http://10.4.0.30:8089/api";

  private http = inject(HttpClient)

  registroPVD(body:RegistroPVD):Observable<DataRegistroPVD_Id_Tramite>{
    return this.http.post<RegistroPVD_Id_Tramite>(`${this.api_secondary}/DocumentoRegistroCompartidoPVD_RCC/RegistroDocumento`, body).pipe(
      map ( (rpta)=> rpta.data[0] )
    );
  }

  getComboTemas():Observable<DataComboTemas[]>{
    return this.http.get<ComboTemas>(`${this.api_primary}/CombosGenerales/ComboTema`).pipe(
      map ( (rpta)=> rpta.data )
    )
  }

  getComboTipoDocumental():Observable<DataComboTipoDocumental[]>{
    return this.http.get<ComboTipoDocumental>(`${this.api_maestra}/TipoDocumental/Listar`).pipe(
      map ( (rpta)=> rpta.data )
    )
  }

  getComboIndicaciones():Observable<DataComboIndicaciones[]>{
    return this.http.get<ComboIndicaciones>(`${this.api_primary}/CombosGenerales/ComboIndicacion`).pipe(
      map ( (rpta)=> rpta.data )
    )
  }

  getComboOficinasDerivadas(IdOficina:number,NombreOficina:string,Nivel:number):Observable<DataOficinasDerivadas[]>{
    const params = new HttpParams()
      .set('IdOficina',IdOficina)
      .set('NombreOficina',NombreOficina)
      .set('Nivel',Nivel)
    return this.http.get<OficinasDerivadas>(`${this.api_maestra}/Oficina/Listar`,{params}).pipe(
      map ( (rpta)=> rpta.data )
    )
  }

  getDetalleSegundoPaso(CodTramite:number):Observable<DataDocumentoRegistrado>{
    const params = new HttpParams()
      .set('CodTramite',CodTramite)
    return this.http.get<DocumentoRegistrado>(`${this.api_secondary}/DocumentoRegistroCompartidoPVD_RCC/InfoDocumentoStep2`,{params}).pipe(
      map ( (rpta)=> rpta.data[0] )
    )
  }

  getOficinasDerivadas(CodTramite:number):Observable<DataOficinasCopias[]>{
    const params = new HttpParams()
      .set('CodTramite',CodTramite)
    return this.http.get<OficinasCopias>(`${this.api_secondary}/DocumentoRegistroCompartidoPVD_RCC/ListarCopiaOficina`,{params}).pipe(
      map ( (rpta)=> rpta.data )
    )
  }

  postOficinasDerivadas(body:PostOficinaCopia):Observable<any>{
    return this.http.post<RegistroPVD_Id_Tramite>(`${this.api_secondary}/DocumentoRegistroCompartidoPVD_RCC/RegistroCopiaOficina`, body)
  }

  getOficinaMostrarDetalle(CodOficina:number):Observable<DataOficinaDetalle>{
    const params = new HttpParams()
      .set('CodOficina',CodOficina)
    return this.http.get<OficinaDetalle>(`${this.api_secondary}/DetTramiteSegTramite/ListaSegTrmiteOrigen`,{params}).pipe(
      map ( (rpta)=> rpta.data[0] )
    )
  }

  getObtenerUnRepresentante(numeropagina:number,cantfilas:number,IdPersona:number,nombre:string,codigoTipoIdentidad:string,numeroDocumento:string):Observable<DataRepresentante>{
    const params = new HttpParams()
      .set('numeropagina',numeropagina)
      .set('cantfilas',cantfilas)
      .set('IdPersona',IdPersona)
      .set('nombre',nombre)
      .set('codigoTipoIdentidad',codigoTipoIdentidad)
      .set('numeroDocumento',numeroDocumento)
      return this.http.get<Representante>(`${this.api_maestra}/Persona/GetListarPersonas`,{params}).pipe(
        map ( (rpta)=> rpta.data[0] )
      )
  }

  enviarDocumentoPVD(codTramite: number, perfil: number){
    const body = {
        codTramite: codTramite,
        perfil: perfil
      };
      return this.http.post<any>(`${this.api_secondary}/DocRegComPVD_RCC_Complementario/RegistroDocAprobacion`, body);
  }

  //Registro RCC
  listContratos():Observable<ListaContratos[]>{
    return this.http.get<ListaContratos[]>(`${this.api_sgd}/contratos/listaSGD`)
  }
}
