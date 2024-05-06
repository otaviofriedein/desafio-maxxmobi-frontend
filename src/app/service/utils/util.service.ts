import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  convertToServerDateFormat(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
  
    return `${year}-${month}-${day}`;
  }

  convertToClientDateFormat(dateString: string) {
    const [year, month, day] = dateString.split('-').map(Number);    
    const date = new Date(year, month - 1, day);

    return date;
  }
}
