/* eslint-disable prettier/prettier */
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidDate', async: false })
export class IsValidDate implements ValidatorConstraintInterface {
  validate(value: string, _args: ValidationArguments): boolean {
    // 日付が有効かどうかをチェック
    const date = new Date(value);
    return (
      !isNaN(date.getTime()) && // 有効な日付かどうか
      value === date.toISOString().split('T')[0] // フォーマットが一致しているか
    );
  }

  defaultMessage(_args: ValidationArguments): string {
    return '有効な日付を入力してください';
  }
}
