import styled from "styled-components";
import { Logo } from "./Logo";
import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "./NewTransactionModal";

const HeaderContainer = styled.header`
  background: ${(props) => props.theme["gray-900"]};
  padding: 2.5rem 0 7.5rem;
`;
const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const NewTransactionButton = styled.button`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme["green-500"]};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  cursor: pointer;
  padding: 0 1.5rem;
  border-radius: 6px;
  &:hover {
    transition: background-color 0.2s;
    color: ${(props) => props.theme.white};
    background: ${(props) => props.theme["green-700"]};
  }
`;

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova Transação</NewTransactionButton>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
