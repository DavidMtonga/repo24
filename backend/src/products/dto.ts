export class ProductDTO {
    name: string;
    description: string;
    price: number;
    stock?: number;
    imageUrl: string[];
    categoryId: number;
  
    constructor(data: ProductDTO) {
      this.name = data.name;
      this.description = data.description;
      this.price = data.price;
      this.stock = data.stock;
      this.imageUrl = data.imageUrl;
      this.categoryId = data.categoryId;
    }
  }