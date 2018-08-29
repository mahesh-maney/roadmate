/**
 * Created by Jerry Kurian on 08-06-2017.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { HttpService } from './http.service';
import { DutyAssignment } from '../entities/assignment/assignment.model';

@Injectable()
export class DutyAssignmentServices extends HttpService {

  resourceUrl = this.baseUrl + '/infomgmt/api/duty-assignments';

  constructor(private http: Http) {
    super(http);
  }
  loadDutyAssignments(): Observable<DutyAssignment[]> {
    return this.http.get(this.resourceUrl).map(this.retResponse).catch(this.handleError);
  }
  edit(location: DutyAssignment): Observable<DutyAssignment> {
    return this.http.put(this.resourceUrl, location).map(this.retResponse).catch(this.handleError);
  }
  create(location: DutyAssignment): Observable<DutyAssignment> {
    return this.http.post(this.resourceUrl, location).map(this.retResponse).catch(this.handleError);
  }
}
