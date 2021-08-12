import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bmodel } from '../models/bmodel.model'

//const baseUrl = 'http://localhost:3000';
const baseUrl = 'https://myblog-roadtoblogging.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class MyblogService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Bmodel[]> {
    return this.http.get<Bmodel[]>(baseUrl+'/getItems');
  }  

  getMyitem(mail: any): Observable<Bmodel[]> {
    return this.http.get<Bmodel[]>(`${baseUrl}/getMyitems?mail=${mail}`);
  }
  
  
  getBlogById(id:any): Observable<any> {
    console.log(id);
    return this.http.get(`${baseUrl}/getSingleItems?id=${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl+'/postItems', data);
  }
 
  update(data: any): Observable<any> {
    return this.http.put(baseUrl+'/updateItems', data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/deleteItems?id=${id}`);
  }

  sendEmail(mail: any): Observable<any>{
    return this.http.get(`${baseUrl}/sendmail?mail=${mail}`);
  }

  verifyOTP(data:any): Observable<any>{
    return this.http.post(baseUrl+'/verify',data);
  }

  onupdate(data: any): Observable<any> {
    console.log(data);
    return this.http.get(`${baseUrl}/getSingleItems?id=${data}`);
  }


}




