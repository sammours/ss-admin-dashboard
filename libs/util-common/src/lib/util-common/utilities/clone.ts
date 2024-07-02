import { DateTime } from "luxon";

export function stringify(key: string | any, value: string) {
    
    return value;
 }
 
 function removeTimeZoneOffsetFromDate(date: Date): Date {
    const dateWithoutTimeZone = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return dateWithoutTimeZone;
 }
 
 function isDateWithoutLocalTime(date: Date) {
    return date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0 && date.getUTCMilliseconds() === 0;
 }

export function clone<T>(value: T): T {
    const obj = JSON.parse(JSON.stringify(value, stringify));
    Object.keys(obj).forEach((key: string) => {
        if (typeof obj[key] === 'string' && DateTime.fromISO(obj[key]).isValid) {
            obj[key] = DateTime.fromJSDate(new Date(obj[key] =  + ''))
         }
    });

    return obj;
}