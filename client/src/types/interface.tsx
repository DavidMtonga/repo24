export default interface IProduct {
  id:number;
  name: string;
  description: string;
  price: number;
  stock?: number;
  category: string;
  imageUrl: string[];
  dateCreated: string;
}