import { IsNotEmpty, IsEmail, Min, Max, IsString } from "class-validator";
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

export class UserRegisterDTO {
  @IsNotEmpty()
  @Min(6)
  @Max(20)
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  @Min(3)
  readonly email: string;

  @IsNotEmpty()
  @Min(6)
  @Max(20)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly address?: string;

  constructor(data: UserRegisterDTO) {
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.address = data.address;
  }
}

export class UserIdDTO {}

export class UserUpdateDTO {}
