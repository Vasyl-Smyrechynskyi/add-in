import { FullNameFormatterStrategyI } from './strategies/full-name-formatter/full-name-formatter-strategy';
import { JsonFullNameFormatter } from './strategies/full-name-formatter/json-strategy';
import { XmlFullNameFormatter } from './strategies/full-name-formatter/xml-strategy';
import { FormatType } from '../enums/format-type';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FullNameFormatterService {
  private formatterStrategy? : FullNameFormatterStrategyI;

  constructor(
    @Inject(JsonFullNameFormatter) private JsonFormatter: JsonFullNameFormatter,
    @Inject(XmlFullNameFormatter) private xmlFormatter: XmlFullNameFormatter
    ) { }

    setStrategy(strategy: FormatType): void {
      if (strategy === FormatType.JSON) {
          this.formatterStrategy = this.JsonFormatter;
      } else if (strategy === FormatType.XML) {
          this.formatterStrategy = this.xmlFormatter;
      } else {
        throw new Error('Format type not supported');
      }
    }
  
    formatFullName(firstName: string, surname: string): string {
      if (!this.formatterStrategy) {
        throw new Error('No strategy selected.');
      }
  
      return this.formatterStrategy.formatName(firstName, surname);
    }
}
