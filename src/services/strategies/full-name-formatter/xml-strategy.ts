import { FullNameFormatterStrategyI } from './full-name-formatter-strategy.js';

export class XmlFullNameFormatter implements FullNameFormatterStrategyI {
    formatName(firstName: string, lastName: string): string {
      const fullName = `<name>
                            <firstName>${firstName}</firstName>
                            <lastName>${lastName}</lastName>
                        </name>`;
      return fullName;
    }
  }