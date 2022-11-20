import styled from "styled-components";
import { Header } from "../components/Header";
import { SearchForm } from "../components/SearchForm";
import { Summary } from "../components/Summary";

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
  return (
    <>
      <Header></Header>
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento web</td>
              <td>
                {" "}
                <PriceHighlight variant="income">
                  R$ 12.000,00
                </PriceHighlight>{" "}
              </td>
              <td> Venda</td>
              <td>13/04/2022</td>
            </tr>
            <tr>
              <td width="50%">Mouse</td>
              <td>
                <PriceHighlight variant="outcome">- R$ 160,00</PriceHighlight>{" "}
              </td>
              <td> Compra</td>

              <td>13/04/2022</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </>
  );
}
