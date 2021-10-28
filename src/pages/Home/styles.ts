import styled from "styled-components";
import { darken } from "polished";

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    img {
      align-self: center;
      max-width: 250px;
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }

    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;

      display: flex;
      align-items: center;
      transition: background 0.2s;
      padding:4px;

      &:hover {
        background: ${darken(0.06, "#7159c1")};
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }

  .GalleryPhotos {
    display: flex;
    flex-direction: row;
    width: 270px;
    overflow: hidden;
  }

  .photo {
    padding: 0 2px;
    transition: 250ms all;

    &:hover {
      margin: 0 40px;
      transform: scale(1.2);
    }
  }
`;

export const SectionFilter = styled.div `
 
    max-width:1050px;
    margin-bottom:30px;
   

  .form {
    justify-content:center;
    align-items:center;
    margin:auto;
    display:flex;
    
  }
  .form-group {
    justify-content:center;
    

    input {
      width:600px;
      padding:10px;
      margin-top:10px;
    }

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
    margin-top:10px;
  }

`