export interface ITransaction {
  id: string;
  type: "income" | "outcome";
  price: number;
  description: string;
  category: string;
  createdAt: string;
}
export interface newTransactionType {
  type: "income" | "outcome";
  price: number;
  description: string;
  category: string;
}
