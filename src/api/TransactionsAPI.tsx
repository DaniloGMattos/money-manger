import { ITransaction, newTransactionType } from "../@types/TransactionsTypes";
import { Config } from "../../config";

import { nanoid } from "nanoid";
async function getTransactions(q?: string): Promise<ITransaction[]> {
  const response = await fetch(
    `${Config.SERVER_URL}/transactions?q=${
      q || ""
    }&_sort=createdAt&_order=desc`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = (await response.json()) as ITransaction[];
  return data;
}

async function createTransaction(
  transaction: newTransactionType
): Promise<ITransaction> {
  const response = await fetch(`${Config.SERVER_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...transaction,
      createdAt: new Date(),
    }),
  });
  const result = (await response.json()) as ITransaction;
  return result;
}

export const transactionsAPI = {
  getTransactions,
  createTransaction,
};
