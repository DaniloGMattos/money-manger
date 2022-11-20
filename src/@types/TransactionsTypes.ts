export interface ITransaction {
  id: string;
  type: "income" | "outcome";
  price: number;
  description: string;
  category: string;
  createdAt: string;
}
