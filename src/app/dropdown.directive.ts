import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[rbDropdown]'
})
export class DropdownDirective {
  private isOpen = false;

  // class open is defined in boostrap css
   @HostBinding('class.open') get opened() {
     return this.isOpen;
   }

   @HostListener('click') open() {
     this.isOpen = true;
   }

   @HostListener('mouseleave') close() {
     this.isOpen = false;
   }

}
