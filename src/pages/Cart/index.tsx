import React from "react";
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";

import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../util/format";
import { Container, ProductTable, Total } from "./styles";

interface Product {
  id: number;
  nome: string;
  descricao: string;
  departamento: string;
  categoria: string;
  preco: number;
  imagem: string;
  title: string;
  price: number;
  image: string;
  provider:string
  discountValue:string;
}

const Cart = (): JSX.Element => {
  const { cart, removeProduct, addProduct } = useCart();
  console.log('cart',cart)


  
  const cartFormatted = cart?.map((product) => (
  product.provider==='brazilian_provider'?
  {
    
    ...product,
    priceFormatted: formatPrice(product.preco),
    subTotal: (product.preco * product.amount),
  }
  :
  {
  ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: (product.price * product.amount*(1 - Number(product.discountValue))),
  }
  
  ));

  const total = formatPrice(
    cartFormatted?.reduce((sumTotal, product) => {
      console.log(sumTotal)
      console.log('sub',Number(product.subTotal))
      let sumTotal1=0
       sumTotal1 = sumTotal1 + Number(product?.subTotal);
      console.log('sum',sumTotal1)
      return (sumTotal = sumTotal + Number(product?.subTotal));
    }, 0)
  );
  

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  return (
    <Container>
      
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {cartFormatted?.map((product) => (
            <tr key={product.id} data-testid="product">
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    data-testid="decrement-product"
                    disabled={product.amount <= 1}
                  >
                    <MdRemoveCircleOutline size={20} />
                  </button>
                  <input
                    type="text"
                    data-testid="product-amount"
                    readOnly
                    value={product.amount}
                  />
                  <button type="button" data-testid="increment-product">
                    <MdAddCircleOutline size={20} />
                  </button>
                </div>
              </td>
              <td>
                <strong>{formatPrice(product.subTotal)}</strong>
              </td>
              <td>
                <button
                  type="button"
                  data-testid="remove-product"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
