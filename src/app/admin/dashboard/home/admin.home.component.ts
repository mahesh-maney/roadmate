import {Component, EventEmitter, OnInit, Output, ViewChild, NgZone} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {isUndefined} from 'util';
import {EventManager} from 'ng-jhipster';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin.home.component.html',
    styleUrls: ['./admin.home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  specialists = [];
  chosenLocation;
  locations = [];
  calendarForm: FormGroup;
  calGroup: FormGroup;
  eventsLoaded = false;
  showCalendarChoice = true;
  specialistsLoaded = false;
  locationsLoaded = false;
  @ViewChild('routerArea')
  routerArea: ModalComponent;

  ngOnInit() {
  }
  loadCalendar($ev, value: any) {
    $ev.preventDefault();
    for (let c in this.calendarForm.controls) {
      this.calendarForm.controls[c].markAsTouched();
    }
    if (this.calendarForm.valid) {
      // Before submitting, set the selected location
       this.loadCalendarData();
    }
  }
  loadCalendarData(){
     this.showCalendar();
  }
  hideCalendar() {
    this.showCalendarChoice = true;
    this.eventsLoaded = false;
  }
  showCalendar() {
    this.showCalendarChoice = false;
    this.eventsLoaded = true;
  }
  locationChanged(val) {
    this.chosenLocation = val;
    this.hideCalendar();
  }
  specialistChanged(val) {
    this.hideCalendar();
  }
  showChoiceOptions() {
    this.showCalendarChoice = true;
    this.eventsLoaded = false;
  }
  hideChoiceOptions() {
    this.showCalendarChoice = false;
  }
  openRouter() {
    this.routerArea.open('lg');
  }
  appointmentClose() {
  }
}
