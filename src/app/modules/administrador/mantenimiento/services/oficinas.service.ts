import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ComboTipo, ComboUbicacion, DataComboTipo, DataComboUbicacion, DataListaOficina, ListaOficina } from '../interfaces/oficinas.interface';

@Injectable({
  providedIn: 'root'
})
export class OficinasService {

  public api_primary = "http://10.4.0.30:8084/api";
  private http = inject(HttpClient)

  //Mantenimiento Oficina
  getListOficina(NomOficina:string, SiglaOficina:string, CodUbicacion:string, FlgEstado:string, FlgVisible:string, FlgEnvioColab:string, Nivel:number, Regini:number, Size:number):Observable<DataListaOficina[]>{
    const params = new HttpParams()
        .set('NomOficina',NomOficina)
        .set('SiglaOficina',SiglaOficina)
        .set('CodUbicacion',CodUbicacion)
        .set('FlgEstado',FlgEstado)
        .set('FlgVisible',FlgVisible)
        .set('FlgEnvioColab',FlgEnvioColab)
        .set('Nivel',Nivel)
        .set('Regini',Regini)
        .set('Size',Size)
    const options = { params: params };
    return this.http.get<ListaOficina>(`${this.api_primary}/AdministradorOficinas/ListaMantenimientoOficinas`, options).pipe(
        map( (response:ListaOficina) => response.data)
    )
  }
  getComboUbicacion():Observable<DataComboUbicacion[]>{
      return this.http.get<ComboUbicacion>(`${this.api_primary}/AdministradorOficinas/ListaUbicacion`).pipe(
          map( (respose:ComboUbicacion) => respose.data)
      )
  }
  getComboTipo():Observable<DataComboTipo[]>{
      return this.http.get<ComboTipo>(`${this.api_primary}/AdministradorOficinas/ListaTipo`).pipe(
          map( (respose:ComboTipo) => respose.data)
      )
  }

}
