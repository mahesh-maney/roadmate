import { Component, EventEmitter, Output } from '@angular/core';
import { DutyLocation } from '../../../core/entities/location/duty.location';
import { DutyLocationServices } from '../../../core/services/duty.location.services';

/**
 * Created by Jerry Kurian on 30-05-2017.
 */
@Component({
  selector: 'app-new-location',
  templateUrl: '../location.component.html',
  styleUrls: ['../location.component.scss']
})
export class NewLocationComponent {
  @Output() locationCreated: EventEmitter<DutyLocation> = new EventEmitter<DutyLocation>();
  @Output() closed: EventEmitter<string> = new EventEmitter();
  errorMessage = '';
  error = false;
  createmode = true;
  loading = false;
  location: DutyLocation = new DutyLocation();
  states: string[] = ['Karnataka', 'Maharashtra'];

  constructor(private locationServices: DutyLocationServices) {
  }

  getCities() {
    switch (this.location.state) {
      case 'Karnataka':
        return ['Bangalore'];
      case 'Maharashtra':
        return ['Nagpur'];
      default:
        return [];
    }
  }

  submit() {
    this.loading = true;
    console.log(this.location);
    this.locationServices.create(this.location).subscribe(
      (data) => {
        this.loading = false;
        this.locationCreated.next(data);
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
