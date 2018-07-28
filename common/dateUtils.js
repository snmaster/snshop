/**
 * Created by ChitSwe on 12/20/16.
 */
/**
 * Created by ChitSwe on 12/14/16.
 */
import Preference from './Preference';
import fecha from 'fecha';

import javascript_time_ago from 'javascript-time-ago';
javascript_time_ago.locale(require('javascript-time-ago/locales/en'));
const timeAgo = new javascript_time_ago('en-US');
Date.isValidDate=function(d){
    if ( Object.prototype.toString.call(d) === "[object Date]" ) {
      if ( isNaN( d.getTime() ) ) {  // d.valueOf() could also work
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return false;
    }
};
Date.prototype.startOfDay = function() {
    this.setHours(0);
    this.setMinutes(0);
    this.setSeconds(0);
    this.setMilliseconds(1);
    return this;
};
Date.prototype.clone=function(){
    return (new Date()).merge(this);
};
Date.prototype.dateOnly=function(){
    this.setHours(0,0,0,0);
    return this;
};
Date.prototype.endOfDay = function() {
    this.setHours(23);
    this.setMinutes(59);
    this.setSeconds(59);
    this.setMilliseconds(999);
    return this;
};
Date.prototype.merge = function(source) {
    this.setYear(source.getFullYear());
    this.setMonth(source.getMonth());
    this.setDate(source.getDate());
    this.setHours(source.getHours());
    this.setMinutes(source.getMinutes());
    this.setSeconds(source.getSeconds());
    this.setMilliseconds(source.getMilliseconds());
    return this;
}



Date.prototype.quarter = function() {
    let month = this.getMonth();
    let quarter = Number.parseInt(month / 3)
    quarter++;
    return quarter;
};
Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + days);
    return this;
}
Date.prototype.daysInMonth = function() {
    const resultDate = this.startOfMonth();
    resultDate.setMonth(resultDate.getMonth() + 1);
    resultDate.setDate(resultDate.getDate() - 1);
    return resultDate.getDate();
}
Date.prototype.startOfMonth = function() {
    this.setDate(1);
    return this.startOfDay();
};
Date.prototype.endOfMonth = function() {
    let days = this.daysInMonth();
    return this.startOfMonth().addDays( days- 1).endOfDay();
};
Date.prototype.startOfQuarter = function() {
    let q = this.quarter();
    let m = (q * 3) - 3;
    this.startOfMonth();
    this.setMonth(m);
    return this;
};

Date.prototype.endOfQuarter = function() {
    let q = this.quarter();
    let m = (q * 3) - 1;
    this.startOfMonth();
    this.setMonth(m);
    return this.endOfMonth();
};


Date.prototype.startOfWeek = function() {
    this.setDate(this.getDate() - this.getDay());
    return this.startOfDay();
};
Date.prototype.endOfWeek = function() {
    return this.startOfWeek().addDays(6).endOfDay();
};
Date.prototype.startOfYear = function() {
    this.startOfMonth();
    this.setMonth(0);
    return this;
};
Date.prototype.endOfYear = function() {
    this.startOfMonth();
    this.setMonth(11);
    return this.endOfMonth();
};

Date.prototype.yesterday=function(){
    return this.addDays(-1);
};
Date.prototype.lastWeek=function(){
    return this.addDays(-7);
};
Date.prototype.lastMonth=function(){
    this.startOfMonth();
    this.setMonth(this.getMonth()-1);
    return this;
};
Date.prototype.lastYear=function(){
    this.startOfYear();
    this.setYear(this.getFullYear()-1);
    return this;
};
Date.prototype.lastQuarter=function(){
    this.startOfQuarter();
    this.setMonth(this.getMonth()-3);
    return this;
};
Date.prototype.tomorrow=function(){
    return this.addDays(1);
};
Date.prototype.nextWeek=function(){
    return this.addDays(7);
};
Date.prototype.nextMonth=function(){
    this.startOfMonth();
    this.setMonth(this.getMonth() + 1);
    return this;
};
Date.prototype.nextQuarter=function(){
    this.startOfQuarter();
    this.setMonth(this.getMonth()+3);
    return this;
};
Date.prototype.nextYear = function(){
    this.startOfYear();
    this.setYear(this.getFullYear() + 1);
    return this;
};

Date.prototype.formatAsShortDate=function(){
    return fecha.format(this,Preference.format.date.short);
};
Date.prototype.formatAsLongDate=function(){
    return fecha.format(this,Preference.format.date.long);
};
Date.prototype.formatAsShortTime=function(){
    return fecha.format(this,Preference.format.time.short);
};
Date.prototype.formatAsLongTime = function(){
    return fecha.format(this,Preference.format.time.long);
};
Date.prototype.toDateOnlyJSON=function(){
    return fecha.format(this,'YYYY-MM-DD');
};

Date.prototype.assumeUTCAsLocal=function(){
    return new Date(this.toJSON().replace('T',' ').replace('Z',''));
};

Date.prototype.assumeLocalAsUTC = function(){
    return new Date (this.getTime() - (this.getTimezoneOffset()) * 60000);
}

    

Date.prototype.timeAgo=function(){
    return timeAgo.format(this);
};

Date.prototype.uniqueNumber=function(){
    let num = this.valueOf();
    if(num <=Date.previousUniqueNumber){
        Date.previousUniqueNumber++;
        return Date.previousUniqueNumber;
    }else{
        Date.previousUniqueNumber = num;
        return num; 
    }

};
Date.previousUniqueNumber = 0;