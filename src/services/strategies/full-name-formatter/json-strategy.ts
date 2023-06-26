import { FullNameFormatterStrategyI } from './full-name-formatter-strategy.js';

export class JsonFullNameFormatter implements FullNameFormatterStrategyI {
    formatName(firstName: string, lastName: string): string {
      const fullName = {
        firstName,
        lastName,
      };
      return JSON.stringify(fullName);
    }
  }