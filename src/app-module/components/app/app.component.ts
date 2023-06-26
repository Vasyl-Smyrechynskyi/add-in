import { Component } from "@angular/core";

/* global console, Excel */

@Component({
  selector: "app-home",
  templateUrl: "./app.component.html",
})
export default class AppComponent {
  fullName: string = "";

  setFullName(name: string) :void {
    this.fullName = name;
  }
}
