import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'getUsername',
})
export class GetUsernamePipe implements PipeTransform {
  transform(value: string): unknown {
    const parts = value.split('@');
    return parts[0];
  }
}
