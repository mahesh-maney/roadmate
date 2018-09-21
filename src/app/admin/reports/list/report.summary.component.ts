import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Report } from '../../../core/entities/report/report.model';
import { ReportSummary } from '../../../core/entities/report/report.summary.model';
import { DutyLocation } from '../../../core/entities/location/duty.location';
import { DutyLocationServices } from '../../../core/services/duty.location.services';
import { ReportServices } from '../../../core/services/report.services';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { ReportData } from '../../../core/entities/report/report.data.model';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { environment } from '../../../../environments/environment.prod';

/**
 * Created by Jerry Kurian on 30-05-2017.
 */
@Component({
  selector: 'app-summary-report',
  templateUrl: './report.summary.component.html',
  styleUrls: ['./report.summary.component.scss']
})
export class ReportSummaryComponent implements OnInit {

  loading = false;
  loaded = false;
  isFailure = false;
  empty = false;
  reportSummary : ReportSummary[];
  date: Date = moment().hours(0).startOf('hour').toDate();
  @ViewChild('locationdetails')
  locationDetailsList: ModalComponent;
  chosenLocation: DutyLocation;
  reportData : ReportData;
  reports: Report[];
  dropDownLabel = environment.reports_listPage_dropDownLabel;
  startDateLabel = environment.reports_listPage_startDate;
  endDateLabel = environment.reports_listPage_endDate;
  locationNameLabel = environment.reports_listPage_locationName;
  visitingLabel = environment.reports_listPage_visiting;
  startTimeLabel = environment.reports_listPage_startTime;
  endtimeLabel = environment.reports_listPage_endTime;
  visitSummaryLabel = environment.reports_listPage_visitSummary;
  noReportRegYetMsg = environment.reports_listPage_noReportRegYetMsg ;
  reportByLabel = environment.reports_listPage_reportByLabel;

  constructor(private reportServices: ReportServices,
    private dutyLocationServices: DutyLocationServices,
    private _sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
     this.load();
  }

  search() {
    console.log("search implementation here . . . ")
    console.log(this.dropDownLabel);
    console.log(this.startDateLabel);
    console.log(this.endDateLabel);
  }

  load() {
    if (!this.date) {
      return alert('Please choose a Date and Time');
    }
    this.loading = true;
    this.reportServices.loadSummary(
      moment(this.date).format('YYYY-MM-DD'),
      moment(this.date).format('HH:mm')
    ).subscribe(
      (data) => {
        this.empty = true;
        this.reportSummary = data;
        if (this.reportSummary.length > 0) {
          this.empty = false;
        }
        this.loading = false;
        this.loaded = true;
      },
      (err) => {
        this.loading = false;
      }
    );
  }

  loadLocation(locationId, name){
    this.chosenLocation = new DutyLocation();
    this.chosenLocation.id = locationId;
    this.chosenLocation.name = name;
    this.loadLocationDetails();
    this.locationDetailsList.open('lg');
  }

  detailsClosed(){
    this.locationDetailsList.close();
  }


  loadLocationDetails() {
    if(this.chosenLocation != undefined){
      this.loading = true;
      this.reportServices.loadReports(
        this.chosenLocation,
        moment(this.date).format('YYYY-MM-DD'),
        moment(this.date).format('HH:mm')
      ).subscribe(
        (data) => {
          this.empty = true;
          this.reportData = data;
          this.reports = data.attendanceResponseList;
          if (this.reports.length > 0) {
            this.empty = false;
          }
          this.loading = false;
        },
        (err) => {
          this.loading = false;
        }
      );
    }
  }
}

