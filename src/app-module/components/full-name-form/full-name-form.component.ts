import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FullNameService } from '../../../services/full-name.service';
import { FormatType } from '../../../enums/format-type';


@Component({
  selector: 'full-name-form',
  templateUrl: './full-name-form.component.html',
  styleUrls: ['./full-name-form.component.css'],
})
export default class FullNameFormComponent implements OnInit {
  @Output() fullNameChanged: EventEmitter<string> = new EventEmitter();
  private fullNameService: FullNameService;
  private formBuilder: FormBuilder;
  selectedFormat: FormatType = FormatType.XML;
  form: FormGroup;
  name: string = "";
  surname: string = "";

  constructor(
    ) {
      this.formBuilder = new FormBuilder();
      this.fullNameService = new FullNameService();

      this.form = this.formBuilder.group({
        name: ['', [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z\s]+$/)
        ]],
        surname: ['', [
          Validators.required,
          Validators.maxLength(25),
          Validators.pattern(/^[a-zA-Z\s]+$/)
        ]],
        format: ['json']
      });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => {
      const name = `${this.form.value.name} ${this.form.value.surname}`;
      this.fullNameChanged.emit(name);
      
      if (this.form.value.format !== this.selectedFormat){
        this.selectedFormat = this.form.value.format;
        console.log(this.selectedFormat, 'selected');
      }
    });
  }

  async setFullName(): Promise<void> {
    await this.fullNameService.insertFullName(
      this.form.value.name, this.form.value.surname, this.selectedFormat);
  }
}
