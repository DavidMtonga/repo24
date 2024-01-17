import {
  IsNotEmpty,
  IsEmail,
  Min,
  Max,
  IsString,
  IsNumber,
  IsPositive,
} from "class-validator";
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

export class UserIdDTO {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(0)
  readonly id: number;

  constructor(data: UserIdDTO) {
    this.id = data.id;
  }
}

export class UserUpdateDTO {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(0)
  readonly id: number;

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

  constructor(data: UserUpdateDTO) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.address = data.address;
  }
}
