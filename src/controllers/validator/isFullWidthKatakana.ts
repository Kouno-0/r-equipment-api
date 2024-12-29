/* eslint-disable prettier/prettier */
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsFullWidthKatakana(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isFullWidthKatakana',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          const fullWidthKatakanaRegex = /^[ァ-ヶー]+$/;
          return typeof value === 'string' && fullWidthKatakanaRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property}は全角カタカナで入力してください。`;
        },
      },
    });
  };
}
