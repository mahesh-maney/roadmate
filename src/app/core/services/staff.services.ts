/**
 * Created by Jerry Kurian on 08-06-2017.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { HttpService } from './http.service';
import { Staff } from '../entities/staff/staff.model';
import { Page } from '../entities/page';
import { DutyLocation } from '../entities/location/duty.location';
import { Station } from '../entities/station/station.model';

@Injectable()
export class StaffServices extends HttpService {

  resourceUrl = this.baseUrl + '/infomgmt/api/users';

  constructor(private http: Http) {
    super(http);
  }
  loadStaffs(): Observable<Staff[]> {
    return this.http.get(this.resourceUrl).map(this.retResponse).catch(this.handleError);
  }
  loadAllStaffsPaged(name: string, station: Station, dutyLoction: DutyLocation, page: number, size: number): Observable<Page<Staff>> {
    let url = this.resourceUrl + '-paged?page=' + page + '&size=' + size;
    if (name) {
      url += '&name=' + name;
    }
    if (station) {
      url += '&stationId=' + station.id;
    }
    if (dutyLoction) {
      url += '&dutyLocationId=' + dutyLoction.id;
    }
    return this.http.get(url)
      .map(this.retResponse).catch(this.handleError);
  }
  edit(staff: Staff): Observable<Staff> {
    return this.http.put(this.resourceUrl, staff).map(this.retResponse).catch(this.handleError);
  }
  create(staff: Staff): Observable<Staff> {
    return this.http.post(this.resourceUrl, staff).map(this.retResponse).catch(this.handleError);
  }
  loadStaff(): Observable<Staff> {
    return this.http.get(this.resourceUrl + '/current').map(this.retResponse).catch(this.handleError);
  }
  loadStaffById(staffId): Observable<Staff> {
    return this.http.get(this.resourceUrl + '/' + staffId).map(this.retResponse).catch(this.handleError);
  }
  delete(staff: Staff) {
    return this.http.delete(this.resourceUrl + '/' + staff.id).map(this.retResponse).catch(this.handleError);
  }
}
