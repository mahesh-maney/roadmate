import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { AccountService } from '../../../shared/auth/account.service'

@Component({
    selector: 'app-change-passwd',
    templateUrl: './changepassword.component.html',
    styleUrls: ['./changepassword.component.scss']
  })
  export class ChangePasswordComponent implements OnInit {
    @Output() passwordUpdated: EventEmitter<String> = new EventEmitter<String>();
    @Output() closed: EventEmitter<string> = new EventEmitter();

    errorMessage = '';
    error = false;
    newPassword : string;
    confirmPassword : string;
    loading = false;
    passwordMatch = false;

    constructor(
        private accountServices: AccountService,
        private _sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        console.log('ngOnInit: ChangePasswordComponent');
    }

    closeWindow() {
        this.closed.emit('closed');
    }

    onPasswordChange() {
        if (this.newPassword != this.confirmPassword) {
            console.log("Password does not match");
            this.passwordMatch = false;
        }
        else {
            this.passwordMatch = true;
        }
    }

    submit() {
        console.log(this.newPassword);
        console.log(this.confirmPassword);

        //this.accountServices.changePassword(this.newPassword);

        this.passwordUpdated.next(this.newPassword);
        this.newPassword = null;
        this.confirmPassword = null;
    }
  }