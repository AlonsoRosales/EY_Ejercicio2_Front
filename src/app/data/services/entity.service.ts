import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {catchError, map, Observable, of} from "rxjs";
import {Proveedor} from "../interfaces/proveedor.interface";

@Injectable({
  providedIn: 'root'
})
export class EntityService{
  private readonly baseUrl: string = environment.baseUrl2;
  private readonly baseUrlScreening: string = environment.baseUrl;
  constructor( private http: HttpClient ) {}

  /***  Metodo para obtener una lista de los proveedores*/
  listaProveedores(): Observable<Proveedor[] | null>{
    const token = sessionStorage.getItem("token");
    if (token == null) {
      return of(null);
    }
    const url = `${this.baseUrl}`;
    return this.http.get<Proveedor[]>(url)
      .pipe(
        map((response: any) => {
          if(response.length == 0){
            return of(null);
          }
          return response;
        }),
        catchError((error: any) => {
          return of(null);
        })
      );
  }

  /***  Metodo para obtener la informacion de un proveedor*/
  infoProveedor(id: string): Observable<Proveedor | null>{
    const token = sessionStorage.getItem("token");
    if (token == null) {
      return of(null);
    }

    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Proveedor>(url)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error: any) => {
          return of(null);
        })
      );
  }

  /***  Metodo para eliminar un proveedor*/
  eliminarProveedor(id:string){
    const token = sessionStorage.getItem("token");
    if (token == null) {
      return of(null);
    }

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        map((response: any) => {
          return true;
        }),
        catchError((error: any) => {
          return of(null);
        })
      );
  }

  /***  Método para registrar un proveedor*/
  registroProveedor(razonsocial: string, nombrecomercial: string, idtributaria: string, telefono: string,
                    correo: string, web: string, direccion: string, pais: string, facturacion: number): Observable<{error: boolean, msg: string}> {
    const response = { error: false, msg: ''};
    const token = sessionStorage.getItem("token");
    if (token == null) {
      response.error = true;
      response.msg = "Error";
      return of(response);
    }
    const payload = new HttpParams().set('razonsocial', razonsocial)
      .set('nombrecomercial', nombrecomercial).set('idtributaria', String(idtributaria))
      .set('telefono', telefono).set('correo', correo).set('web', web).set('direccion', direccion)
      .set('pais', pais).set('facturacion', String(facturacion));
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const url = `${this.baseUrl}`;
    return this.http.post(url, payload, {headers})
      .pipe(
        map((r:any) => {
          response.msg = r.message;
          return response;
        }),
        catchError(error => {
          response.error = true;
          response.msg = error.error.message;
          return of(response);
        })
      );
  }

  /***  Método para actualizar un registro de combustible*/
  actualizarProveedor(id:string, razonsocial: string, nombrecomercial: string, idtributaria: string, telefono: string,
                      correo: string, web: string, direccion: string, pais: string, facturacion: number): Observable<{error: boolean, msg: string}> {
    const response = { error: false, msg: ''};
    const token = sessionStorage.getItem("token");
    if (token == null) {
      response.error = true;
      response.msg = "Error";
      return of(response);
    }
    const payload = new HttpParams().set('razonsocial', razonsocial)
      .set('nombrecomercial', nombrecomercial).set('idtributaria', String(idtributaria))
      .set('telefono', telefono).set('correo', correo).set('web', web).set('direccion', direccion)
      .set('pais', pais).set('facturacion', String(facturacion));
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, payload, {headers})
      .pipe(
        map((r:any) => {
          response.msg = r.message;
          return response;
        }),
        catchError(error => {
          response.error = true;
          response.msg = error.error.message;
          return of(response);
        })
      );
  }

  /***  Método para realizar screening*/
  screeningProveeedor(entidad: string, fuente: string): Observable<{hitsFuente: number, msg: any}>{
    const response = { hitsFuente: 0, msg: ''};
    const token = sessionStorage.getItem("token");
    if (token == null) {
      response.hitsFuente = 0;
      response.msg = "Error";
      return of(response);
    }
    const headers = new HttpHeaders({'Authorization': token});
    const url = `${this.baseUrlScreening}/search/${fuente}/${entidad}`;
    return this.http.get(url,{headers})
        .pipe(
            map((response: any) => {
              response.hitsFuente = response.hits;
              response.msg = response.elementos;
              return response;
            }),
            catchError((error: any) => {
              response.hitsFuente = 0;
              response.msg = "Error";
              return of(response);
            })
        );
  }
}
