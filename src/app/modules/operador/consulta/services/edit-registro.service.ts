import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataEditRegistro, EditRegistro, PostDatosRegistro, PostEnviaDoc } from '../interfaces/edit.interface';

@Injectable({
  providedIn: 'root'
})
export class EditRegistroService {

  public api_secondary = "http://10.4.0.30:8085/api";

  private http = inject(HttpClient)

  getDetalleEdit(CodTramite:number):Observable<DataEditRegistro>{
    const params = new HttpParams()
      .set('CodTramite',CodTramite)
    const urlWithParams = `${this.api_secondary}/DocumentoEditarCompartidoPVD_RCC/SelEditarRegistroDocumento`;
    return this.http.get<EditRegistro>(urlWithParams,{params}).pipe(
      map ( rpta => rpta.data[0])
    )
  }

  postEnviarDoc(registro:PostEnviaDoc):Observable<any>{
    return this.http.post<any>(`${this.api_secondary}/DocumentoEditarCompartidoPVD_RCC/EditarEnviarDocumento`, registro);
  }

  postDetalleEdit(registro:PostDatosRegistro):Observable<any>{
    return this.http.post<any>(`${this.api_secondary}/DocumentoEditarCompartidoPVD_RCC/EditDocDatosGenerales`, registro);
  }

}
