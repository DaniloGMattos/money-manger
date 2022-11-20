import { createContext, useEffect, useState } from "react";
import { ITransaction } from "../@types/TransactionsTypes";
import { transactionsAPI } from "../api/TransactionsAPI";

interface TransactionsContextType {
  transactions: ITransaction[];
}
interface TransactionsProviderProps {
  children: React.ReactNode;
}
export const TransactionsContext = createContext({} as TransactionsContextType);
export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  async function loadTransactions() {
    const data = await transactionsAPI.getTransactions();
    setTransactions(data);
  }
  useEffect(() => {
    (async () => {
      await loadTransactions();
    })();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
