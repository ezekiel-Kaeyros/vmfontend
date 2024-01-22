import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entity } from '../types/entity-tytpe';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsConfigService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll<T extends Entity>(url: string): Observable<T[]> {
    if (!this.isUrl(url)) {
      throw new Error(url + ': Wrong URL. The URL must start with /');
    }
    return this.http.get<T[]>(this.apiUrl + url);
  }

  get<T extends Entity>(url: string, param: string|number): Observable<T> {
    if (!this.isUrl(url)) {
      throw new Error(url + ': Wrong URL. The URL must start with /')
    }
    return this.http.get<T>(this.apiUrl + url + `/${param}`);
  }

  post<T extends Entity>(url: string, data: T): Observable<T> {
    if (!this.isUrl(url)) {
      throw new Error(url + ': Wrong URL. The URL must start with /')
    }
    return this.http.post<T>(this.apiUrl + url, data);
  }

  put<T extends Entity>(url: string, param: string|number, data: T): Observable<T> {
    if (!this.isUrl(url)) {
      throw new Error(url + ': Wrong URL. The URL must start with /')
    }
    return this.http.put<T>(this.apiUrl + url + `/${param}`, data);
  }

  delete<T extends Entity>(url: string, param: string|number) {
    if (!this.isUrl(url)) {
      throw new Error(url + ': Wrong URL. The URL must start with /')
    }
    return this.http.delete<any>(this.apiUrl + url + `/${param}`);
  }

  checkPassword<T extends Entity>(url: string, param: string, data: T): Observable<T> {
    if (!this.isUrl(url)) {
      throw new Error(url + ': Wrong URL. The URL must start with /')
    }
    return this.http.post<T>(this.apiUrl + url + `/${param}`, data);
  }

  private isUrl(url: string): boolean {
    return /^\/[a-zA-Z0-9._/-]*$/.test(url);
  }

}
