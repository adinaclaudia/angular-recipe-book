import {NgModule} from "@angular/core";
import {DropdownDirective} from "./dropdown.directive";
import {HomeComponent} from "./home.component";
@NgModule({
  declarations: [DropdownDirective, HomeComponent],
  exports: [DropdownDirective] //don't need to export HomeComponent because I am not using it in the template, only in the routing and there it is available
})
export class CoreModule{}
