import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ITransaction } from "../@types/TransactionsTypes";
import { transactionsAPI } from "../api/TransactionsAPI";

import { Header } from "../components/Header";
import { SearchForm } from "../components/SearchForm";
import { Summary } from "../components/Summary";
import { TransactionsContext } from "../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../utils/formatters";

const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`;
const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme["gray-700"]};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`;
interface PriceHighlightProps {
  variant: "income" | "outcome";
}
const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === "income"
      ? props.theme["green-300"]
      : props.theme["red-300"]};
`;

export function Transactions() {
  const { transactions } = useContext(TransactionsContext);
  return (
    <>
      <Header></Header>
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <PriceHighlight variant={transaction.type}>
                    {transaction.type === "outcome" && "- "}
                    {priceFormatter.format(transaction.price)}
                  </PriceHighlight>
                </td>
                <td> {transaction.category}</td>
                <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </>
  );
}
