import {Report} from './report.model';
export interface ReportData {
  locationName : string;
  totalAssigned : number;
  totalBioMetricRegistered : number;
  totalPresent : number;
  totalAbsent : number;
  attendanceResponseList: Report[];
}
