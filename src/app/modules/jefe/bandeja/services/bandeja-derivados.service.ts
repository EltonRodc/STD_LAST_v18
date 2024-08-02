import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BandejaComboOficinaDestino, BandejaComboTipoDocumento, BandejaExcelDerivados, BandejaOficinaDerivado, BandejaTablaDerivados, DataBandejaComboOficinaDestino, DataBandejaComboTipoDocumento, DataBandejaExcelDerivados, DataBandejaOficinaDerivado, DataBandejaTablaDerivados } from '../interfaces/bandeja-derivados.interface';

@Injectable({
  providedIn: 'root'
})
export class BandejaDerivadosService {

  public api_primary = "http://10.4.0.30:8084/api";
  public api_secondary = "http://10.4.0.30:8085/api";

  private http = inject(HttpClient)

  getListadoTipoDocumento():Observable<DataBandejaComboTipoDocumento[]>{
    return this.http.get<BandejaComboTipoDocumento>(`${this.api_primary}/CombosGenerales/ComboTpoDocumento`).pipe(
        map ( (rpta)=> rpta.data )
    )
  }

  getListadoOficinaDestino():Observable<DataBandejaComboOficinaDestino[]>{
    return this.http.get<BandejaComboOficinaDestino>(`${this.api_primary}/AdministradorCorrelativoProfesional/MntCorrProfesionalListaOficinas`).pipe(
        map ( (rpta)=> rpta.data )
    )
  }

  getListadoTablaDerivados(Entrada:number,Interno:number,Salida:number,fDesde:string,fHasta:string,Codificacion:string,Asunto:string,
    CodOficinaLogin:number,CodTipoDoc:number,CodTema:number,CodOficinaDes:number,Aceptado:number,SAceptado:number,Columna:string,Idir:string
  ):Observable<DataBandejaTablaDerivados[]>{
    const params = new HttpParams()
      .set('Entrada', Entrada.toString())
      .set('Interno', Interno.toString())
      .set('Salida', Salida.toString())
      .set('fDesde', fDesde)
      .set('fHasta', fHasta)
      .set('Codificacion', Codificacion)
      .set('Asunto', Asunto)
      .set('CodOficinaLogin', CodOficinaLogin.toString())
      .set('CodTipoDoc', CodTipoDoc.toString())
      .set('CodTema', CodTema.toString())
      .set('CodOficinaDes', CodOficinaDes.toString())
      .set('Aceptado', Aceptado.toString())
      .set('SAceptado', SAceptado.toString())
      .set('Columna', Columna)
      .set('Idir', Idir)

    const urlWithParams = `${this.api_primary}/JefeBandejaDerivados/BnjDerivadoLista`

    return this.http.get<BandejaTablaDerivados>(urlWithParams, { params: params }).pipe(
      map ( (rpta)=> rpta.data )
    )
  }

  getListadoExcel(Entrada:number,Interno:number,Salida:number,fDesde:string,fHasta:string,Codificacion:string,Asunto:string,
    CodOficinaLogin:number,CodTipoDoc:number,CodTema:number,CodOficinaDes:number,Aceptado:number,SAceptado:number,Columna:string,Idir:string
  ):Observable<DataBandejaExcelDerivados[]>{
    const params = new HttpParams()
      .set('Entrada', Entrada.toString())
      .set('Interno', Interno.toString())
      .set('Salida', Salida.toString())
      .set('fDesde', fDesde)
      .set('fHasta', fHasta)
      .set('Codificacion', Codificacion)
      .set('Asunto', Asunto)
      .set('CodOficinaLogin', CodOficinaLogin.toString())
      .set('CodTipoDoc', CodTipoDoc.toString())
      .set('CodTema', CodTema.toString())
      .set('CodOficinaDes', CodOficinaDes.toString())
      .set('Aceptado', Aceptado.toString())
      .set('SAceptado', SAceptado.toString())
      .set('Columna', Columna)
      .set('Idir', Idir)

    const urlWithParams = `${this.api_primary}/JefeBandejaDerivados/BnjDerivadoXlsLista`

    return this.http.get<BandejaExcelDerivados>(urlWithParams, { params: params }).pipe(
      map ( (rpta)=> rpta.data )
    )
  }
  getListadoOficinaDerivadoExcel(CodOficina: number): Observable<string> {
    const params = new HttpParams().set('CodOficina', CodOficina.toString());
    const urlWithParams = `${this.api_secondary}/DetTramiteSegTramite/ListaSegTrmiteOrigen`;
    return this.http.get<BandejaOficinaDerivado>(urlWithParams, { params: params }).pipe(
      map(rpta => rpta.data[0].cNomOficina)
    );
  }


}
