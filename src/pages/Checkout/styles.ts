import styled from "styled-components";
import { darken, lighten } from "polished";

export const Container = styled.div`
  display: flex;
  max-width: 900px;
  justify-content: center;
  align-items: center;

  .form-group {
    h1 {
      color: white;
      margin-bottom: 10px;
    }
  }

  input {
    width: 490px;
    padding: 10px;
    margin-bottom: 10px;
  }

  button {
    background: #7159c1;
    color: #fff;
    border: 0;
    border-radius: 4px;
    padding: 6px 20px;
    font-weight: bold;
    text-transform: uppercase;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.06, "#7159c1")};
    }
  }

  .Payment {
    .CardNumber {
      width: 200px;
    }

    input {
      width: 150px;
      padding: 0px;
      margin-top: 12px;
    }

    max-width: 500px;
  }
`;
