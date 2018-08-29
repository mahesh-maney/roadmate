import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {HttpService} from '../../core/services/http.service';

@Injectable()
export class AccountService  extends HttpService {
  registrationUrl = this.baseUrl + '/api/register';
  accountUrl = this.baseUrl + '/api/account';
  changePasswordUrl = this.baseUrl + '/api/account/change-password';
  activateUrl = this.baseUrl + '/api/activate';
  constructor(private http: Http) {
    super(http);
  }
  get(): Observable<any> {
      return this.http.get(this.accountUrl).map((res: Response) => res.json());
  }
  save(account: any): Observable<Response> {
      return this.http.post(this.accountUrl, account);
  }
  register(account: any): Observable<any> {
    return this.http.post(this.registrationUrl, account);
  }
  registerPatient(account: any): Observable<any> {
    return this.http.post(this.registrationUrl + '?type=PATIENT', account);
  }
  activate(key: string): Observable<any> {
    return this.http.get(this.activateUrl + '?key=' + key);
  }
  changePassword(password: string):Observable<any> {
    return this.http.post(this.changePasswordUrl, password);
  }
}
