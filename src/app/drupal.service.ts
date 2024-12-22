import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from './../environments/environment';

const DEFAULT_CONFIG = {
  credentials: {
    accessToken: environment.drupalAuthToken
  },
}

@Injectable({
  providedIn: 'root'
})
export class DrupalService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': DEFAULT_CONFIG.credentials.accessToken,
      'Access-Control-Allow-Origin':'*',
      'Target-URL': 'https://dev-fkd10.pantheonsite.io/jsonapi/node/page/478ecbff-11fe-4532-854e-2b899720ba29'
    })
  }

  getPage(blog: any) {
    let url = "http://localhost:4000";
    return this.http.get(url, this.httpOptions);
  } 
}
