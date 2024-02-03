import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CategoryDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly id: number;

  constructor(data: CategoryDto) {
    this.id = data.id;
  }
}
