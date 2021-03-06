import styled from "styled-components";

export const MainButton = styled.button`
  border: 1px solid black;
  background-color: ${(props) => props.backgroundColor || "transparent"};
`;

export const InfoGridWraper = styled.div`
  diaplay: flex;
  flex-direction: column;
  margin: 10px 0;
  border: 0.5px solid black;
`;

export const Row = styled.div`
  border: 0.5px solid black;
  display: flex;
`;

export const Text = styled.p`
  border: 0.5px solid black;
  margin: 0;
  padding: 5px;
`;
