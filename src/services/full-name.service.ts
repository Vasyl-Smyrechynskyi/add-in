import { FullNameFormatterService } from './full-name-formatter.service';
import { FormatType } from '../enums/format-type';


export class FullNameService {
  formatterService: FullNameFormatterService;

    constructor(
      ) {
        this.formatterService = new FullNameFormatterService();
      }

      async insertFullName(name: string, surname: string, format: FormatType): Promise<void> {
        console.log('format');
        this.formatterService.setStrategy(format);
        console.log(format);
        const insertValue = this.formatterService.formatFullName(name, surname);
        console.log(insertValue);

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
