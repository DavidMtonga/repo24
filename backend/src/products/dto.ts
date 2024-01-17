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

export class ProductIdDTO {
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  readonly id: number;

  constructor(data: ProductIdDTO) {
    this.id = data.id;
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

  @IsNotEmpty()
  @IsNumber()
  readonly categoryId: number;

  constructor(data: ProductDTO) {
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.stock = data.stock;
    this.categoryId = data.categoryId;
  }
}

export class UpdateProductImageDTO {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  readonly imageUrl?: string[];

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly id: number;

  constructor(data: UpdateProductImageDTO) {
    this.id = data.id;
    this.imageUrl = data.imageUrl;
  }
}
