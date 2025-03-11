import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hpBarColor',
})
export class HpBarColorPipe implements PipeTransform {
  transform(value: number): string {
    switch (true) {
      case value > 60:
        return 'bg-green-600';
      case value > 30 && value <= 60:
        return 'bg-orange-600';
      default:
        return 'bg-red-600';
    }
  }
}
