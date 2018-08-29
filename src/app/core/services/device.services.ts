/**
 * Created by Jerry Kurian on 08-06-2017.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { HttpService } from './http.service';
import { Device } from '../entities/device/device.model';

@Injectable()
export class DeviceServices extends HttpService {

  resourceUrl = this.baseUrl + '/infomgmt/api/devices';

  constructor(private http: Http) {
    super(http);
  }

  loadDevices(): Observable<Device[]> {
    return this.http.get(this.resourceUrl).map(this.retResponse).catch(this.handleError);
  }

  loadDevicesByKey(key: string): Observable<Device[]> {
    let url = this.resourceUrl;
    if (key) {
      url += '?imei=' + key;
    }
    return this.http.get(url).map(this.retResponse).catch(this.handleError);
  }

  edit(device: Device): Observable<Device> {
    return this.http.put(this.resourceUrl, device).map(this.retResponse).catch(this.handleError);
  }

  create(device: Device): Observable<Device> {
    return this.http.post(this.resourceUrl, device).map(this.retResponse).catch(this.handleError);
  }
}
