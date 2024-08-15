import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataOficina, DataPerfiles, DataRepresentante, DatosPrincipales, Oficina, Perfiles, Representante } from '../interfaces/perfiles.interface';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  public api_primary = "http://10.4.0.30:8084/api";
  public api_maestra = "http://10.4.0.30:8083/api";
  private readonly LOCAL_STORAGE_KEY = 'datos_principales';


  private http = inject(HttpClient);

  getPerfiles(IdUsuario:number):Observable<DataPerfiles[]>{
    const params = new HttpParams()
      .set('IdUsuario',IdUsuario)

    const urlWithParams = `${this.api_primary}/Home/HomePerfiles`;
    return this.http.get<Perfiles>(urlWithParams,{params}).pipe(
      map ( rpta => rpta.data)
    )
  }

  getInfoOficina(IdOficina:number,NombreOficina:string,Nivel:number):Observable<DataOficina>{
    const params = new HttpParams()
      .set('IdOficina',IdOficina)
      .set('NombreOficina',NombreOficina)
      .set('Nivel',Nivel)

    const urlWithParams = `${this.api_maestra}/Oficina/Listar`;
    return this.http.get<Oficina>(urlWithParams,{params}).pipe(
      map ( rpta => rpta.data[0])
    )
  }

  getRepresentante(numeropagina:number,cantfilas:number,IdPersona:number,nombre:string,codigoTipoIdentidad:string,numeroDocumento:string):Observable<DataRepresentante>{
    const params = new HttpParams()
      .set('numeropagina',numeropagina)
      .set('cantfilas',cantfilas)
      .set('IdPersona',IdPersona)
      .set('nombre',nombre)
      .set('codigoTipoIdentidad',codigoTipoIdentidad)
      .set('numeroDocumento',numeroDocumento)

    const urlWithParams = `${this.api_maestra}/Persona/GetListarPersonas`;
    return this.http.get<Representante>(urlWithParams,{params}).pipe(
      map ( rpta => rpta.data[0])
    )
  }

   // Método para guardar los datos
  setDatosPrincipales(datos: DatosPrincipales): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(datos));
  }

  // Método para obtener los datos
  getDatosPrincipales(): DatosPrincipales | null {
    const datos = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return datos ? JSON.parse(datos) : null;
  }

  // Método para eliminar los datos
  clearDatosPrincipales(): void {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY);
  }


}
