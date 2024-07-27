import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataEditPerfil, DataListPerfil, DeletePerfil, EditPerfil, ListPerfil, PostAddPerfil, PostEditPerfil } from '../interfaces/perfil.interface';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  public api_primary = "http://10.4.0.30:8084/api";
  private http = inject(HttpClient)

  //Mantenimiento Perfil
  getListPerfil(Perfil:string):Observable<DataListPerfil[]>{
    const params = new HttpParams()
        .set('Perfil',Perfil)
        .set('Orden','ASC')
        .set('Campo','Perfil')
    const options = { params: params };
    return this.http.get<ListPerfil>(`${this.api_primary}/AdministradorPerfil/ListaMantenimientoPerfil`,options).pipe(
        map( (respose:ListPerfil) => respose.data)
    )
  }
  postPerfil(body: PostAddPerfil): Observable<PostAddPerfil> {
      return this.http.post<PostAddPerfil>(`${this.api_primary}/AdministradorPerfil/AgregarMantenimientoPerfil`, body);
  }
  getDetallePerfil(iCodPerfil:number):Observable<DataEditPerfil[]>{
      const params = new HttpParams()
          .set('iCodPerfil',iCodPerfil)
      const options = { params: params };
      return this.http.get<EditPerfil>(`${this.api_primary}/AdministradorPerfil/SelEditarPerfil`,options).pipe(
          map( (respose:EditPerfil) => respose.data)
      )
  }
  editarPerfil(codigo: number, perfil:string): Observable<PostEditPerfil> {
      const body = { codigo: codigo, Perfil: perfil };
      return this.http.put<PostEditPerfil>(
          `${this.api_primary}/AdministradorPerfil/EditarMantenimientoPerfil`, body);
  }
  deletePerfil(codPerfil: number): Observable<DeletePerfil> {
      return this.http.delete<DeletePerfil>(`${this.api_primary}/AdministradorPerfil/EliminarMantenimientoPerfil`, {
        body: {
          codPerfil: codPerfil
        }
      });
  }

}
