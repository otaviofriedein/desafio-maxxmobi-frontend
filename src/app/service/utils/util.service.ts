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
    let [year, month, day] = dateString.split('-').map(Number);
    day = day + 1;

    return `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;
  }

  formatToLocalDate(dateString: string) {
    let dateFormatted = this.convertToClientDateFormat(dateString);
   
    return new Date(dateFormatted).toLocaleDateString();
  }
}
