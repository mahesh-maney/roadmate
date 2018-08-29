import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';
import {Principal} from '../../../shared/auth/principal.service';
import {EventManager} from 'ng-jhipster';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
  showAvatar = false;
  user: any;
  showImage = false;
  constructor(public userblockService: UserblockService, principal: Principal, 
    eventManager: EventManager) {
    this.setUserDetails(principal);
    eventManager.subscribe('loggedin',
      (data) => { this.setUserDetails(data.content); }
    );
    eventManager.subscribe('loggedout',
      (data) => {
        this.showAvatar = false;
        this.user = {};
      }
    );
  }
  setUserDetails(principal) {
    if (principal != null) {
      const identity: Promise<any> = principal.identity();
      identity.then((data) => {
        if (data !== null ) {
          this.user = {
            picture: 'assets/img/user/01.jpg',
            firstName: data.firstName,
            lastName: data.lastName
          };
          this.showAvatar = true;
        }
      });
    }
  }
  ngOnInit() {
  }
  userBlockIsVisible() {
    return this.userblockService.getVisibility();
  }
}
