import { useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
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

  const fetchTransactions = useCallback(async (query?: string) => {
    const data = await transactionsAPI.getTransactions(query);
    setTransactions(data);
  }, []);

  const createTransaction = useCallback(async (data: newTransactionType) => {
    const transaction = await transactionsAPI.createTransaction(data);
    setTransactions((prev) => [transaction, ...prev]);
  }, []);

  useEffect(() => {
    (async () => {
      await fetchTransactions();
    })();
  }, [fetchTransactions]);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
