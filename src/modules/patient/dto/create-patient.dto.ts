export class CreatePatientDto {
  readonly name: string;
  readonly email: boolean;
  readonly password: string;
  readonly passwordConfirm: string;
  readonly doctor: string;
}
// export enum typeEnum {
//   Patient,
//   Doctor,
// }
