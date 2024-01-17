import { IsNotEmpty, IsEmail, Min, Max } from "class-validator";
export class UserLoginDTO {
  @IsEmail()
  @IsNotEmpty()
  @Min(3)
  readonly email: string;

  @IsNotEmpty()
  @Min(6)
  @Max(20)
  readonly password: string;

  constructor(data: UserLoginDTO) {
    this.email = data.email;
    this.password = data.password;
  }
}

export class UserRegisterDTO {}

export class UserIdDTO {}

export class UserUpdateDTO {}
