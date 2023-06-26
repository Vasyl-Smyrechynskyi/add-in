import { FullNameFormatterService } from './full-name-formatter.service';
import { FormatType } from '../enums/format-type';
import { Inject, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FullNameService {

    constructor(
      @Inject(FullNameFormatterService) private formatterService: FullNameFormatterService
      ) { }

      async insertFullName(name: string, surname: string, format: FormatType): Promise<void> {
        this.formatterService.setStrategy(format);
        const insertValue = this.formatterService.formatFullName(name, surname);

        try {
          await Excel.run(async (context: any) => {
            const range = context.workbook.getSelectedRange();
    
            // Update values
            range.values = insertValue;
    
            await context.sync();
          });
        } catch (error) {
          console.error(error);
        }
      }
}
