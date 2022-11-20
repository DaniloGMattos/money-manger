import styled, { css } from "styled-components";
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";
import { priceFormatter } from "../utils/formatters";
const SummaryContainer = styled.section`
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  margin-top: -5rem;
`;
interface SummaryCardProps {
  variant?: "green";
}
const SummaryCard = styled.div<SummaryCardProps>`
  background-color: ${(prop) => prop.theme["gray-600"]};
  padding: 2rem;
  border-radius: 6px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${(prop) => prop.theme["gray-300"]};
  }
  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
  }
  ${(props) =>
    props.variant === "green" &&
    css`
      background-color: ${(prop) => prop.theme["green-700"]};
    `}
`;

export function Summary() {
  const { transactions } = useContext(TransactionsContext);
  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.price;
        acc.total += transaction.price;
      } else {
        acc.outcome += transaction.price;
        acc.total -= transaction.price;
      }
      return acc;
    },
    { income: 0, outcome: 0, total: 0 }
  );
  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e"></ArrowCircleUp>
        </header>
        <strong>{priceFormatter.format(summary.income)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68"></ArrowCircleDown>
        </header>
        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#00b37e"></CurrencyDollar>
        </header>
        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
