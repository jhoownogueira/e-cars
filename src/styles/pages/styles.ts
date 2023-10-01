import styled from "styled-components";

export const LoginContainer = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  main {
    width: 100%;
    max-width: 400px;
    background: ${(props) => props.theme.orion_black_box};
    padding: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    border-radius: 1rem;
    img {
      width: 72px;
      height: 72px;
    }

    h1 {
      color: ${(props) => props.theme.gray_300};
      font-size: 1.2rem;
    }

    h4 {
      color: ${(props) => props.theme.gray_300};
      font-size: 1rem;
      font-weight: 400;
    }

    form {
      width: 100%;
      display: flex;
      margin-top: 1rem;
      margin-bottom: 1rem;
      flex-direction: column;
      gap: 1rem;
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
    }

    footer {
      width: 100%;
      button {
        width: 100%;
        height: 2.5rem;
        border-radius: 4px;
        border: none;
        outline: none;
        color: ${(props) => props.theme.orion_white};
        background: ${(props) => props.theme.primary};
        transition: all 0.2s;
        &:hover {
          filter: brightness(0.8);
        }
      }
    }
  }
`;
