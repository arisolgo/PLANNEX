import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dominicanCurrency',
})
export class DominicanCurrencyPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return 'RD$ ' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
}
