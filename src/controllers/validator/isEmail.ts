/* eslint-disable prettier/prettier */
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsEmail(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isEmail',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          // メールアドレスの正規表現
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return typeof value === 'string' && emailRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property}は正しいメールアドレス形式で入力してください。`;
        },
      },
    });
  };
}
