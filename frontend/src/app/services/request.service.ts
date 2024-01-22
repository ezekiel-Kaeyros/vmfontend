import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private apiUrl = environment.apiUrl;

  url = `${this.apiUrl}/api/`;
  download_url= `${this.apiUrl}/`;
  constructor(private http: HttpClient) { }

  posData(URL:string, data: any){
    let url= this.url + URL + '/';
    console.log(url);
    return this.http.post(url, data);
  }

  download(url: string) {
    let URL= this.download_url + url + '/';
    console.log(URL);
    var link = document.createElement('a');
    link.href = URL;
    link.download = URL;
    link.dispatchEvent(new MouseEvent('click'));
    
    // return this.http.get(URL)
  }
}
