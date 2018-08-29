/**
 * Created by Jerry Kurian on 08-06-2017.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import {HttpService} from './http.service';
import {Designation} from '../entities/staff/staff.model';

@Injectable()
export class DesignationServices extends HttpService {

  resourceUrl = this.baseUrl + '/infomgmt/api/designations';

  constructor(private http: Http) {
    super(http);
  }
  loadDesignations(): Observable<Designation[]> {
    return this.http.get(this.resourceUrl).map(this.retResponse).catch(this.handleError);
  }
  edit(designation: Designation): Observable<Designation> {
    return this.http.put(this.resourceUrl, designation).map(this.retResponse).catch(this.handleError);
  }
  create(designation: Designation): Observable<Designation> {
    return this.http.post(this.resourceUrl, designation).map(this.retResponse).catch(this.handleError);
  }
}
