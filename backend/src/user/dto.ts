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

  constructor(d: UserLoginDTO) {
    this.email = d.email;
    this.password = d.password;
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

  constructor(d: UserRegisterDTO) {
    this.username = d.username;
    this.email = d.email;
    this.password = d.password;
    this.address = d.address;
  }
}

export class UserIdDTO {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(0)
  readonly id: number;

  constructor(d: UserIdDTO) {
    this.id = d.id;
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

  constructor(d: UserUpdateDTO) {
    this.id = d.id;
    this.username = d.username;
    this.email = d.email;
    this.password = d.password;
    this.address = d.address;
  }
}

export class UserResetLinkDTO {
  @IsEmail()
  @IsNotEmpty()
  @Min(3)
  readonly email: string;

  constructor(d: UserResetLinkDTO) {
    this.email = d.email;
  }
}

export class UserPasswordUpdateDTO {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(0)
  readonly id: number;

  @IsNotEmpty()
  @Min(6)
  @Max(20)
  readonly password: string;

  constructor(d: UserPasswordUpdateDTO) {
    this.id = d.id;
    this.password = d.password;
  }
}
