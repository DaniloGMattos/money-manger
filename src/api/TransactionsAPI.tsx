import { ITransaction } from "../@types/TransactionsTypes";

async function getTransactions(): Promise<ITransaction[]> {
  const response = await fetch("http://localhost:3333/transactions");
  const data = await response.json();
  return data;
}

export const transactionsAPI = {
  getTransactions,
};
