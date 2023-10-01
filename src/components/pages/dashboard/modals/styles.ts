import styled from "styled-components";

export const LoadingContainer = styled.section`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  span {
    color: ${(props) => props.theme.orion_white};
  }
`;

export const CarModalContainer = styled.section`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  span {
    color: ${(props) => props.theme.orion_white};
  }
  fieldset {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    label {
      font-size: 0.875rem;
      color: ${(props) => props.theme.gray_700};
    }

    input {
      width: 100%;
      height: 2.5rem;
      border: 1px solid ${(props) => props.theme.gray_700};
      border-radius: 4px;
      padding: 0.5rem;
      background: ${(props) => props.theme.orion_black};
      color: ${(props) => props.theme.gray_300};
    }
  }
  button {
    width: 100%;
    height: 2.5rem;
    border: none;
    outline: none;
    border-radius: 4px;
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.orion_white};
    transition: all 0.2s ease-in-out;

    &:hover {
      filter: brightness(0.8);
    }
  }
`;
