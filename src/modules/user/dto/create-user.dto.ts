export enum typeEnum {
  Patient,
  Doctor,
}
export class CreateUserDto {
  readonly name: string;
  readonly email: boolean;
  readonly password: string;
  readonly passwordConfirm: string;
  readonly type: typeEnum;
}
