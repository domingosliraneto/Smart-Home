import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'camera',
})

export class CameraPipe implements PipeTransform {
  constructor(private dom: DomSanitizer){

  }
  transform(value, args) {
    return this.dom.bypassSecurityTrustResourceUrl(value);
  }
}
