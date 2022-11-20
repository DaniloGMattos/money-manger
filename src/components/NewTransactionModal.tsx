import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import styled from "styled-components";

import { TransactionsContext } from "../contexts/TransactionsContext";
import { useContext } from "react";

const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`;
const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme["gray-800"]};
  position: fixed;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    input {
      border-radius: 6px;
      border: 0;
      background: ${(props) => props.theme["gray-900"]};
      color: ${(props) => props.theme["gray-300"]};

      padding: 1rem;
      &::placeholder {
        color: ${(props) => props.theme["gray-500"]};
      }
    }
    button[type="submit"] {
      height: 58px;
      border: 0;
      background: ${(props) => props.theme["green-500"]};
      color: ${(props) => props.theme.white};
      font-weight: bold;
      cursor: pointer;
      padding: 0 1.25rem;
      border-radius: 6px;
      margin-top: 1.5rem;
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      &:not(:disabled):hover {
        transition: background-color 0.2s;
        color: ${(props) => props.theme.white};
        background: ${(props) => props.theme["green-700"]};
      }
    }
  }
`;

const Close = styled(Dialog.Close)`
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  background: transparent;
  border: 0;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme["gray-500"]};
`;

const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 0.5rem;
`;
interface TransactionTypeButtonProps {
  variant: "income" | "outcome";
}
const TransactionTypeButton = styled(
  RadioGroup.Item
)<TransactionTypeButtonProps>`
  background: ${(props) => props.theme["gray-700"]};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  border: 0;
  color: ${(props) => props.theme["gray-300"]};
  svg {
    color: ${(props) =>
      props.variant === "income"
        ? props.theme["green-300"]
        : props.theme["red-300"]};
  }
  &[data-state="unchecked"]:hover {
    transition: background-color 0.2s;
    background: ${(props) => props.theme["gray-600"]};
  }
  &[data-state="checked"] {
    color: ${(props) => props.theme.white};
    background-color: ${(props) =>
      props.variant === "income"
        ? props.theme["green-500"]
        : props.theme["red-500"]};
    svg {
      color: ${(props) => props.theme.white};
    }
  }
`;
const newTransactionSchema = z.object({
  type: z.enum(["income", "outcome"]),
  price: z.number(),
  description: z.string(),
  category: z.string(),
});

type newTransactionType = z.infer<typeof newTransactionSchema>;

export function NewTransactionModal() {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<newTransactionType>({
    resolver: zodResolver(newTransactionSchema),
  });
  const { createTransaction } = useContext(TransactionsContext);

  async function handleCreateTransactions(data: newTransactionType) {
    await createTransaction(data);
    reset();
  }
  return (
    <Dialog.Portal>
      <Overlay>
        <Content>
          <Dialog.Title>Nova Transação</Dialog.Title>
          <Close>
            <X />
          </Close>
          <form onSubmit={handleSubmit(handleCreateTransactions)}>
            <input
              type="text"
              {...register("description")}
              placeholder="Descrição"
              required
            />
            <input
              type="number"
              {...register("price", { valueAsNumber: true })}
              placeholder="Preço"
              required
            />
            <input
              type="text"
              {...register("category")}
              placeholder="Categoria"
              required
            />

            <Controller
              control={control}
              name="type"
              render={({ field }) => {
                return (
                  <TransactionType
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <TransactionTypeButton value="income" variant="income">
                      <ArrowCircleUp size={24} />
                      Entrada
                    </TransactionTypeButton>
                    <TransactionTypeButton value="outcome" variant="outcome">
                      <ArrowCircleDown size={24} />
                      Saída
                    </TransactionTypeButton>
                  </TransactionType>
                );
              }}
            />

            <button type="submit" disabled={isSubmitting}>
              Cadastrar
            </button>
          </form>
        </Content>
      </Overlay>
    </Dialog.Portal>
  );
}
