export class UpdateUserDto {
  readonly username: string;
  readonly admin: boolean;
  readonly pointsDifference: number;
  readonly img: string;
  readonly bio: string;
  readonly password: string;
  readonly email: string;
}
