/**
 * Created by Jerry Kurian on 08-06-2017.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { HttpService } from './http.service';
import { Station, Cities } from '../entities/station/station.model';
import { Page } from '../entities/page';

@Injectable()
export class StationServices extends HttpService {

  resourceUrl = this.baseUrl + '/infomgmt/api/stations';

  constructor(private http: Http) {
    super(http);
  }
  loadStations(): Observable<Station[]> {
    return this.http.get(this.resourceUrl).map(this.retResponse).catch(this.handleError);
  }
  loadStationsByKey(key: string): Observable<Station[]> {
    return this.http.get(this.resourceUrl + '?stationName=' + key).map(this.retResponse).catch(this.handleError);
  }
  edit(station: Station): Observable<Station> {
    return this.http.put(this.resourceUrl, station).map(this.retResponse).catch(this.handleError);
  }
  create(station: Station): Observable<Station> {
    return this.http.post(this.resourceUrl, station).map(this.retResponse).catch(this.handleError);
  }
  loadStationCities(key: string): Observable<Cities[]> {
    return this.http.get('../../../assets/json/cities.json')
      .map(this.retResponse)
      .catch(this.handleError);
  }
}
