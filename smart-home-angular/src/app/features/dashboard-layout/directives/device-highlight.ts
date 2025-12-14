import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[smartHomeDeviceHighlight]',
  standalone: true
})
export class DeviceHighlight {

  private el = inject(ElementRef);
  active = input.required();

  ngOnChanges(){
    this.updateClass()
  }

  private updateClass(){
    const element = this.el.nativeElement;

    if (this.active()) {
    element.classList.add('active-icon');
  } else {
    element.classList.remove('active-icon');
  }
  }

}
