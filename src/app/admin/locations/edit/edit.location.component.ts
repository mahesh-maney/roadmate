import { Component, EventEmitter, Output, Input } from '@angular/core';

import { DutyLocation } from '../../../core/entities/location/duty.location';
import { DutyLocationServices } from '../../../core/services/duty.location.services';

import { isUndefined } from 'util';

/**
 * Created by Jerry Kurian on 30-05-2017.
 */
@Component({
  selector: 'app-edit-location',
  templateUrl: '../location.component.html',
  styleUrls: ['../location.component.scss']
})
export class EditLocationComponent {
  @Input() location: DutyLocation;
  @Output() locationUpdated: EventEmitter<DutyLocation> = new EventEmitter<DutyLocation>();
  @Output() closed: EventEmitter<string> = new EventEmitter();
  errorMessage = '';
  error = false;
  updatemode = true;
  loading = false;
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
    console.log(this.location);
    this.loading = true;
    this.locationServices.edit(this.location).subscribe(
      (data) => { this.loading = false; this.locationUpdated.emit(data); },
      (err) => {
        this.errorMessage = err;
        this.error = true;
        this.loading = false;
      }
    );
  }

  closeWindow() {
    this.error = false;
    this.closed.emit('closed');
  }
}
