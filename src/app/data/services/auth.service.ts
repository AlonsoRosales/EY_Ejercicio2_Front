import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private readonly baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) {}

  /***  Método para login*/
  login(username: string, password: string): Observable<{ error: boolean, token: string }> {
    const response = { error: false, token: ''};
    const payload = { username: username, password: password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.baseUrl + '/login', JSON.stringify(payload), {headers})
      .pipe(
        map((r:any) => {
          response.token = r.token;
          return response;
        }),
        catchError(error => {
          response.error = true;
          return of(response);
        })
      );
  }

  checkToken(): Observable<boolean>{
      const token = sessionStorage.getItem("token");
      if (token == null) {
            return of(false);
      }
      const headers = new HttpHeaders({'Authorization': token});
      return this.http.get(this.baseUrl + '/verify-token', { headers })
          .pipe(
              map((response: any) => {
                  return response.success;
              }),
              catchError((error: any) => {
                  return of(false);
              })
          );
  }
}
