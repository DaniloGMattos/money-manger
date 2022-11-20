import { createContext, useEffect, useState } from "react";
import { ITransaction, newTransactionType } from "../@types/TransactionsTypes";
import { transactionsAPI } from "../api/TransactionsAPI";

interface TransactionsContextType {
  transactions: ITransaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: newTransactionType) => Promise<void>;
}
interface TransactionsProviderProps {
  children: React.ReactNode;
}
export const TransactionsContext = createContext({} as TransactionsContextType);
export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  async function fetchTransactions(query?: string) {
    const data = await transactionsAPI.getTransactions(query);
    setTransactions(data);
  }
  async function createTransaction(data: newTransactionType) {
    const transaction = await transactionsAPI.createTransaction(data);
    setTransactions((prev) => [transaction, ...prev]);
  }
  useEffect(() => {
    (async () => {
      await fetchTransactions();
    })();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
