import { Component, EventEmitter, Output } from '@angular/core';
import { Configuration } from '../../../core/entities/configuration/configuration.model';
import { ConfigurationServices } from '../../../core/services/configuration.services';

/**
 * Created by Jerry Kurian on 30-05-2017.
 */
@Component({
  selector: 'app-new-configuration',
  templateUrl: '../configuration.component.html',
  styleUrls: ['../configuration.component.scss']
})
export class NewConfigurationComponent {

  @Output() configurationCreated: EventEmitter<Configuration> = new EventEmitter<Configuration>();
  @Output() closed: EventEmitter<string> = new EventEmitter();
  errorMessage = '';
  error = false;
  createmode = true;
  loading = false;
  configuration: Configuration = new Configuration();

  constructor(private configurationServices: ConfigurationServices) {
    this.configuration.authorities = ['ROLE_USER'];
  }

  submit() {
    console.log(this.configuration);
    if (/\d/.test(this.configuration.firstName) || /\d/.test(this.configuration.lastName)) {
      return alert('Please enter a valid First and Last Name');
    }
    if (this.configuration.login.length < 6) {
      return alert('User Id must be at least 6 characters');
    }
    if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.configuration.email)) {
      return alert('Please enter a valid email');
    }
    this.loading = true;
    this.configurationServices.create(this.configuration).subscribe(
      (data) => {
        this.loading = false;
        this.configurationCreated.next(data);
      },
      (err) => {
        this.errorMessage = err;
        this.error = true;
        this.loading = false;
      }
    );
  }

  closeWindow() {
    this.closed.emit('closed');
  }
}
