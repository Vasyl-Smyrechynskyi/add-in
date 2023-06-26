import { Component, ViewEncapsulation, EventEmitter, OnInit, Output, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FullNameService } from '../../../services/full-name.service';
import { FormatType } from '../../../enums/format-type';


@Component({
  selector: 'full-name-form',
  templateUrl: './full-name-form.component.html',
  styleUrls: ['./full-name-form.component.css'],
  encapsulation: ViewEncapsulation.None, 
})
export default class FullNameFormComponent implements OnInit {
  @Output() fullNameChanged: EventEmitter<string> = new EventEmitter();
  
  selectedFormat: FormatType = FormatType.XML;
  form: FormGroup;
  name: string = "";
  surname: string = "";

  constructor(
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(FullNameService) private fullNameService: FullNameService
    ) {
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
      }
    });
  }

  async setFullName(): Promise<void> {
    await this.fullNameService.insertFullName(
      this.form.value.name, this.form.value.surname, this.selectedFormat);
  }
}
