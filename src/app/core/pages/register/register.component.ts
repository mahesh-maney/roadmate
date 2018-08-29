import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {User} from '../../../shared/user/user.model';
import {RegistrationState} from './RegistrationState';
import {AccountService} from '../../../shared/auth/account.service';
import {LoginService} from '../../../shared/login/login.service';
import {isUndefined} from 'util';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Output() registered: EventEmitter<User> = new EventEmitter();
  @Output() loggedIn: EventEmitter<User> = new EventEmitter();

  userDetForm: FormGroup;
  registrationError = false;
  loginError = false;
  state = RegistrationState.STATE_REGISTER;
  account = new User();
  valForm: FormGroup;
  actForm: FormGroup;
  passwordForm: FormGroup;
  loginForm: FormGroup;
  errormsg;
  loading = false;
  constructor(private fb: FormBuilder,
              private accountService: AccountService, private loginService: LoginService) {
    const password = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]));
    const confirmPassword = new FormControl('', CustomValidators.equalTo(password));
    this.passwordForm = fb.group({
      'password': password,
      'confirmPassword': confirmPassword
    });
    this.valForm = fb.group({
      'username': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')])],
      'dob': [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
      'accountagreed': [null, Validators.required],
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'passwordGroup': this.passwordForm,
      'mobile': [null, Validators.required]
    });
    this.actForm = fb.group({
      'key': [null, Validators.compose([Validators.required])]
    });
    this.loginForm = fb.group({
      'login': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')])],
      'password': password
    });
    this.userDetForm = fb.group({
      'First Name': [null, Validators.compose([Validators.required])],
      'Last Name': [null, Validators.required],
      'Date of Birth': [null]
    });
  }
  submitForm($ev, value: any) {
    this.errormsg = '';
    this.loginError = false;
    this.registrationError = false;
    $ev.preventDefault();

    if (this.state === RegistrationState.STATE_LOGIN) {
      this.handleLogin(value);
    } else {
      if (this.state === RegistrationState.STATE_REGISTER) {
        this.handleRegistration(value);
      } else {
        this.handleActivation(value);
      }
    }
  }
  showLoginForm() {
    this.state = RegistrationState.STATE_LOGIN;
  }
  showSignupForm() {
    this.state = RegistrationState.STATE_REGISTER;
  }
  loggedInCallBack() {
    const ref = this;
    return function(err){
      if ( !isUndefined(err) && !err.ok) {
        ref.loginError = true;
        ref.errormsg = err.statusText;
        ref.loading = false;
      } else {
        ref.loggedIn.next();
        ref.loading = false;
      }
    };
  }
  private handleLogin(value) {
    for (let c in this.loginForm.controls) {
      this.loginForm.controls[c].markAsTouched();
    }
    if ( this.loginForm.valid ) {
      this.loading = true;
      this.account.password = value.password;
      this.account.username = value.login;
      this.errormsg = '';
      this.loginService.login(this.account, this.loggedInCallBack());
    }
  }
  private handleRegistration(value) {
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    for (let c in this.passwordForm.controls) {
      this.passwordForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      this.loading = true;
      this.account.email = value.email;
      this.account.password = value.passwordGroup.password;
      this.account.login = value.username;
      this.account.firstName = value.firstName;
      this.account.lastName = value.lastName;
      this.account.email = value.email;
      this.account.mobileNumber = value.mobile;
      this.account.dob = value.dob;
      this.accountService.registerPatient(this.account).subscribe(
        (data) => { this.state = RegistrationState.STATE_ACTIVATE; this.loading = false; },
        (err) => {
          this.registrationError = true;
          this.loading = false;
          this.errormsg = err._body;
        }
      );
    }
  }
  private handleActivation(value) {
    this.loading = true;
    this.errormsg = '';
    this.accountService.activate(value.key).subscribe(
      (data) => {
        this.account.username = this.account.email;
        this.registered.next(this.account);
        this.loading = false;
      },
      (err) => {
        this.registrationError = true;
        this.loading = false;
        this.errormsg = err._body;
      }
    );
  }

}
