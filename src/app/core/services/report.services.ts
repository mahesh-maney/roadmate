/**
 * Created by Jerry Kurian on 08-06-2017.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { HttpService } from './http.service';
import { ReportData } from '../entities/report/report.data.model';
import { ReportSummary } from '../entities/report/report.summary.model';
import { DutyLocation } from '../entities/location/duty.location';

@Injectable()
export class ReportServices extends HttpService {

  resourceUrl = this.baseUrl + '/infomgmt/api/attendances';

  constructor(private http: Http) {
    super(http);
  }

  loadReports(dutyLocation?: DutyLocation, date?: string, time?: string): Observable<ReportData> {
    let suffix = '';
    if (dutyLocation) {
      suffix += (suffix ? '&' : '?') + 'dutyLocationId=' + dutyLocation.id;
    }
    if (date) {
      suffix += (suffix ? '&' : '?') + 'date=' + date;
    }
    if (time) {
      suffix += (suffix ? '&' : '?') + 'time=' + time;
    }
    return this.http.get(this.resourceUrl + suffix)
      .map(this.retResponse).catch(this.handleError);
  }

  loadSummary(date?: string, time?: string): Observable<ReportSummary[]> {
    let suffix = '';
    if (date) {
      suffix += (suffix ? '&' : '?') + 'date=' + date;
    }
    if (time) {
      suffix += (suffix ? '&' : '?') + 'time=' + time;
    }
    return this.http.get(this.resourceUrl + '/summary' + suffix)
      .map(this.retResponse).catch(this.handleError);
  }
}
