/**
 * Created by Jerry Kurian on 10-08-2017.
 */
import {Injectable} from '@angular/core';
import * as moment from 'moment-timezone';

@Injectable()
export class DateUtil {

  FORMAT = 'YYYY-MM-DD+HH:MM';
  startOfMonth() {
    const date = moment(), y = date.get('year'), m = date.get('month');
    const firstDay = moment().year(y).month(m).day(1);
    return firstDay.format(this.FORMAT);
  }
  lastOfMonth() {
    const date = moment(), y = date.get('year'), m = date.get('month');
    const lastDay = moment().year(y).month(m + 1).day(1);
    return lastDay.format(this.FORMAT);
  }
  format(moment: any) {
    moment.format(this.FORMAT);
    return moment;
  }
  formatForDisplay(date: any){
    return moment(date).format('ll');
  }
  formatWithTimezone(date: any, tz){
    let tzMom = moment.tz(date,tz);
    return tzMom.format();
  }
  localTz = moment.tz.guess();
  returnForTimezone(date: any, tz: string){
    date = moment(date);
    let dateObj = {year: date.year(),month: date.month(), day: date.date(),
      hour: date.hour(), minute: date.minute()};
    return moment.tz(dateObj, tz);
  }
  returnForBrowserTimezone(date: any){
    date = moment(date);
    let dateObj = {year: date.year(),month: date.month(), day: date.date(),
      hour: date.hour(), minute: date.minute()};
    return moment.tz(dateObj, this.localTz);
  }
  formatForStartOfDay(date: any){
    date = moment(date);
    date.hour(0);
    date.minutes(0);
    date.seconds(0);
    return date;
  }
}
