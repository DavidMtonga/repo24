import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  ArrayMinSize,
  Min,
  IsPositive,
} from "class-validator";

export class CategoryIdDTO {
  @IsNotEmpty()
  @Min(0)
  @IsNumber()
  @IsPositive()
  readonly categoryId: number;

  constructor(data: CategoryIdDTO) {
    this.categoryId = data.categoryId;
  }
}

export class ProductDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly price: number;

  @IsNumber()
  @IsPositive()
  readonly stock?: number;

  @IsArray()
  @ArrayMinSize(1)
  readonly imageUrl: string[];

  @IsNotEmpty()
  @IsNumber()
  readonly categoryId: number;

  constructor(data: ProductDTO) {
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.stock = data.stock;
    this.imageUrl = data.imageUrl;
    this.categoryId = data.categoryId;
  }
}
