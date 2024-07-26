import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ComboColaborador, DataComboColaborador, DataListaColaboradoresInternoProfesional, DataListaTrabajadoresOficina, DataTipoDocumentoProfesional, ListaColaboradoresInternoProfesional, ListaTrabajadoresOficina, RegistroColaborador, RegistroInternoProfesional, TipoDocumentoProfesional } from '../interfaces/doc-int-prof.interface';

@Injectable({providedIn: 'root'})

export class DocIntProService {

  public api_primary = "http://10.4.0.30:8084/api";
  public api_secondary = "http://10.4.0.30:8085/api";

  private http = inject(HttpClient)

  getListTipoDocumentoInternoProfesional(CodOficina:number,NumAnio:number):Observable<DataTipoDocumentoProfesional[]>{
    const params = new HttpParams()
        .set('CodOficina', CodOficina.toString())
        .set('NumAnio', NumAnio.toString())
    return this.http.get<TipoDocumentoProfesional>(`${this.api_primary}/JefeDocInternoProfesional/RegProfComboTipoDocumento`, { params }).pipe(
        map ( (rpta:TipoDocumentoProfesional ) => rpta.data)
    )
  }

  getListIntegrantesOficinas(CodOficina:number):Observable<DataListaTrabajadoresOficina[]>{
    const params = new HttpParams()
        .set('CodOficina', CodOficina.toString())
    return this.http.get<ListaTrabajadoresOficina>(`${this.api_primary}/JefeDocInternoProfesional/RegProfListaOficina`, { params }).pipe(
        map ( (rpta:ListaTrabajadoresOficina ) => rpta.data)
    )
  }

  agregarDocumentoInternoProfesional(registro:RegistroInternoProfesional):Observable<any>{
    return this.http.post<RegistroInternoProfesional>(`${this.api_primary}/JefeDocInternoProfesional/RegProfAgregarDocumento`, registro)
  }

  getListarColaboradores(CodTramite:number):Observable<DataListaColaboradoresInternoProfesional[]>{
    const params = new HttpParams()
        .set('CodTramite', CodTramite.toString())
    return this.http.get<ListaColaboradoresInternoProfesional>(`${this.api_primary}/JefeDocInternoProfesional/RegProfListaAsignOfcna`, { params }).pipe(
        map ( (rpta)=> rpta.data )
    )
}

  deleteColaborador(codMovimiento:number,codUsuario:number, editar:number):Observable<any>{
      return this.http.delete<any>(`${this.api_primary}/JefeDocInternoProfesional/RegProfEliminarAsignOfcna`, {
          body: {
            codMovimiento: codMovimiento,
            codUsuario: codUsuario,
            editar: editar
          }
      });
  }

  agregarColaborador(registro:RegistroColaborador):Observable<any>{
      return this.http.post<any>(`${this.api_primary}/JefeDocInternoProfesional/RegProfAgregarAsignOfcna`, registro)
  }

  listarTrabajadorColaborador(CodOficina:number):Observable<DataComboColaborador[]>{
      const params = new HttpParams()
          .set('CodOficina', CodOficina.toString())
      return this.http.get<ComboColaborador>(`${this.api_primary}/JefeDocInternoProfesional/RegProfListaTrabjAsignOfcna`, { params }).pipe(
          map ( (rpta)=> rpta.data )
      )
  }


}
