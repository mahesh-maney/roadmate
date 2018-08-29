import {Injectable, Output} from '@angular/core';

import { Principal } from '../auth/principal.service';
import { AuthServerProvider } from '../auth/auth-jwt.service';
import {EventManager} from 'ng-jhipster';

@Injectable()
export class LoginService {
  constructor(
      private principal: Principal,
      private authServerProvider: AuthServerProvider,
      private eventManager: EventManager
  ) {
    console.log('Created Login Service');
  }
  login(credentials, callback?) {
      const cb = callback || function() {};

      return new Promise((resolve, reject) => {
          this.authServerProvider.login(credentials).subscribe((data) => {
              this.principal.identity(true).then((account) => {
                  // After the login the language will be changed to
                  // the language selected by the user during his registration
                  if (account !== null) {
                  }
                  resolve(data);
                  this.eventManager.broadcast({name: 'loggedin', content: this.principal});
              });
              return cb();
          }, (err) => {
              this.logout();
              reject(err);
              return cb(err);
          });
      });
  }
  loginCheckForPassword(credentials, callback?) {
      const cb = callback || function() {};
      return new Promise((resolve, reject) => {
          this.authServerProvider.login(credentials).subscribe((data) => {
              return cb();
          }, (err) => {
              return cb(err);
          });
      });
  }
  loginWithToken(jwt, rememberMe) {
      return this.authServerProvider.loginWithToken(jwt, rememberMe);
  }
  logout() {
      this.authServerProvider.logout().subscribe();
      this.principal.authenticate(null);
  }
}
