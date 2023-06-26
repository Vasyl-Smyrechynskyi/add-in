import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import AppComponent from "./components/app/app.component";
import FullNameFormComponent from "./components/full-name-form/full-name-form.component";
import { FullNameService } from "../services/full-name.service";
import { FullNameFormatterService } from "../services/full-name-formatter.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JsonFullNameFormatter } from "../services/strategies/full-name-formatter/json-strategy";
import { XmlFullNameFormatter } from "../services/strategies/full-name-formatter/xml-strategy";


@NgModule({
  declarations: [AppComponent, FullNameFormComponent ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  bootstrap: [AppComponent],
  providers: [
    JsonFullNameFormatter, XmlFullNameFormatter, FullNameFormatterService, FullNameService
  ],
})
export default class AppModule {}
