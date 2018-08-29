import { Component, OnInit, AfterViewInit, Renderer, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { StateStorageService } from '../auth/state-storage.service';

@Component({
    selector: 'jhi-login-modal',
    templateUrl: './login.component.html'
})
export class JhiLoginModalComponent implements OnInit, AfterViewInit {
    @Output() loggedIn: EventEmitter<any> = new EventEmitter();
    @Input() isModal = true;
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    loading = false;
    constructor(
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router,
    ) {
        this.credentials = {};
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        // Renderrer seems to have been depricated and replaced with Renderer2. Tried with it but hsa not worked
        const elem = this.elementRef.nativeElement.querySelector('#username');
        this.renderer.invokeElementMethod(elem, 'focus', []);
    }

    cancel() {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
    }

    login() {
        this.loading = true;
        this.loginService.login({
            username: this.username,
            password: this.password,
            rememberMe: this.rememberMe
        }).then(() => {
            this.authenticationError = false;
            if (this.router.url === '/register' || (/activate/.test(this.router.url)) ||
                this.router.url === '/finishReset' || this.router.url === '/requestReset') {
                this.router.navigate(['']);
            }

            // // previousState was set in the authExpiredInterceptor before being redirected to login modal.
            // // since login is succesful, go to stored previousState and clear previousState
            //   const redirect = this.stateStorageService.getUrl();
            //   if (redirect) {
            //       this.router.navigate([redirect]);
            //   } else {
            //     this.loggedIn.next();
            //   }

            this.router.navigate(['/users']);
        }).catch(() => {
            this.loading = false;
            this.authenticationError = true;
        });
    }

    register() {
        this.router.navigate(['/register']);
    }

    requestResetPassword() {
        this.router.navigate(['/reset', 'request']);
    }
}
