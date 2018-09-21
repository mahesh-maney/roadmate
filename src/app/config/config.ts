import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()

export class Config {
  private _config: Object
  private _env: Object

  constructor(private http: Http) {
  }
/**
 *
 *
 * @returns
 * @memberof Config
 */
load() {
    return new Promise((resolve, reject) => {
      this.http.get('src/app/Config/env.json').map(res => res.json())
      .subscribe((env_data) => {
        this._env = env_data;
        this.http.get('src/app/Config/' + env_data.env + '.json')
        .map(res => res.json())
        .catch((error: any) => {
          console.error(error);
          return Observable.throw(error.json().error || 'Server error');
        })
        .subscribe((data) => {
          this._config = data;
          resolve(true);
        });
      });
    });
  }
  getEnv(key: any) {
    return this._env[key];
  }

  get(key: any) {
    return this._config[key];
  }
};
