export default interface IProduct {
  name: string;
  description: string;
  price: number;
  stock?: number;
  category: string;
  image: string[];
  dateCreated: string;
}
