import styled from "styled-components";

export const DashboardContainer = styled.section`
  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1em;
    padding: 2rem;
    border-bottom: 1px solid ${(props) => props.theme.gray_900};
    .left {
      display: flex;
      align-items: center;
      justify-content: start;
      gap: 1em;
      img {
        width: 32px;
        height: 32px;
        filter: grayscale(1) brightness(100);
      }
      h1 {
        font-size: 1.2rem;
        font-weight: 600;
        color: ${(props) => props.theme.orion_white};
      }
    }
    .right {
      display: flex;
      align-items: center;
      gap: 1rem;
      button {
        width: 100%;
        max-width: 200px;
        height: 2.5rem;
        border: none;
        outline: none;
        border-radius: 4px;
        padding: 0 1rem;
        color: ${(props) => props.theme.orion_white};
        background: ${(props) => props.theme.primary};

        &.sair {
          background: ${(props) => props.theme.secondary};
        }
      }
    }
  }

  main {
    width: 100%;
    table {
      width: 100%;
      text-align: left;
      border-collapse: collapse;
      color: ${(props) => props.theme.orion_white};

      thead {
        background: ${(props) => props.theme.gray_900};
        tr {
          th {
            padding: 1rem;
            font-size: 0.9rem;
            font-weight: 600;
            color: ${(props) => props.theme.orion_white};
          }
        }
      }

      tbody {
        background: ${(props) => props.theme.orion_black};
        tr {
          border-bottom: 1px solid ${(props) => props.theme.gray_900};
          td {
            padding: 1rem;
            font-size: 0.9rem;
            font-weight: 600;
            color: ${(props) => props.theme.orion_white};
            button {
              padding: 0.25rem 0.5rem;
              margin-left: 0.5rem;
              border: 1px solid ${(props) => props.theme.gray_900};
              background: transparent;
              color: ${(props) => props.theme.gray_300};
              font-size: 0.75rem;
              border-radius: 4px;
              &:hover {
                transition: all 0.2s;
                background: ${(props) => props.theme.gray_300};
                color: ${(props) => props.theme.gray_900};
              }

              &:last-child {
                background: ${(props) => props.theme.secondary};
                &:hover {
                  transition: all 0.2s;
                  background: ${(props) => props.theme.primary};
                  color: ${(props) => props.theme.orion_white};
                }
              }
            }
          }
        }
      }

      tfoot {
        tr {
          border-bottom: 10px solid ${(props) => props.theme.gray_900};
        }
      }
    }
  }
`;
