/**
 * Created by Jerry Kurian on 16-06-2017.
 */
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';

export class HttpService {
  baseUrl = 'http://isense.learnym.com';
  constructor(http: Http) {
  }
  retResponse(res: Response) {
    const body = res.json();
    return body || { };
  }
  handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
