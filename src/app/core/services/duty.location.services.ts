/**
 * Created by Jerry Kurian on 08-06-2017.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { HttpService } from './http.service';
import { DutyLocation } from '../entities/location/duty.location';

@Injectable()
export class DutyLocationServices extends HttpService {

  resourceUrl = this.baseUrl + '/infomgmt/api/duty-locations';

  constructor(private http: Http) {
    super(http);
  }
  loadDutyLocations(): Observable<DutyLocation[]> {
    return this.http.get(this.resourceUrl).map(this.retResponse).catch(this.handleError);
  }
  loadDutyLocationsByKey(key: string): Observable<DutyLocation[]> {
    return this.http.get(this.resourceUrl + '?dutyLocationName=' + key).map(this.retResponse).catch(this.handleError);
  }
  edit(location: DutyLocation): Observable<DutyLocation> {
    return this.http.put(this.resourceUrl, location).map(this.retResponse).catch(this.handleError);
  }
  create(location: DutyLocation): Observable<DutyLocation> {
    return this.http.post(this.resourceUrl, location).map(this.retResponse).catch(this.handleError);
  }
}
