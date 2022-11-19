import styled from "styled-components";
import logo from "../assets/logo.png";

const Box = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  h3 {
    font-weight: 800;
    font-size: 24px;
  }
`;
export function Logo() {
  return (
    <Box>
      <img width={40} height={40} src={logo} alt="" />
      <h3>Money M.</h3>
    </Box>
  );
}
