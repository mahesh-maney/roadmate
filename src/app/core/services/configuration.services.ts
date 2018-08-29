/**
 * Created by Jerry Kurian on 08-06-2017.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { HttpService } from './http.service';
import { MaxDevice, Configuration } from '../entities/configuration/configuration.model';

@Injectable()
export class ConfigurationServices extends HttpService {

  resourceUrl = this.baseUrl + '/api/users';

  constructor(private http: Http) {
    super(http);
  }
  getMaxDevices(): Observable<MaxDevice> {
    return this.http.get(this.baseUrl + '/infomgmt/api/configurations')
      .map((response) => {
        const configs = <Array<MaxDevice>>response.json();
        return configs.find((maxDevice) => maxDevice.id === 1);
      }).catch(this.handleError);
  }
  setMaxDevices(maxDevice: MaxDevice): Observable<MaxDevice> {
    return this.http.put(this.baseUrl + '/infomgmt/api/configurations', maxDevice)
      .map((response) => response.json()).catch(this.handleError);
  }
  loadConfigurations(): Observable<Configuration[]> {
    return this.http.get(this.resourceUrl).map(this.retResponse).catch(this.handleError);
  }
  edit(configuration: Configuration): Observable<Configuration> {
    return this.http.put(this.resourceUrl, configuration).map(this.retResponse).catch(this.handleError);
  }
  create(configuration: Configuration): Observable<Configuration> {
    return this.http.post(this.resourceUrl, configuration).map(this.retResponse).catch(this.handleError);
  }
}
