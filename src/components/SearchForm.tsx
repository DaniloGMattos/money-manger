import { MagnifyingGlass } from "phosphor-react";
import styled from "styled-components";

const Container = styled.form`
  display: flex;
  gap: 1rem;
  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background-color: ${(props) => props.theme["gray-900"]};
    color: ${(props) => props.theme["gray-300"]};
    padding: 1rem;
    &::placeholder {
      color: ${(props) => props.theme["gray-500"]};
    }
  }
  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    border: 0;
    padding: 1rem;
    background: transparent;
    border: 1px solid ${(props) => props.theme["green-300"]};
    color: ${(props) => props.theme["green-500"]};
    font-weight: bold;
    border-radius: 6px;
    &:hover {
      border-color: ${(props) => props.theme["green-500"]};
      background-color: ${(props) => props.theme["green-500"]};
      color: ${(props) => props.theme.white};
      transition: color 0.2s background-color 0.2s border-color 0.2s;
    }
  }
`;
export function SearchForm() {
  return (
    <Container>
      <input placeholder="Busque por transações" />
      <button>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </Container>
  );
}
