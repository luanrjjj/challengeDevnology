import React from "react";
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";
import {useHistory, Router,Link } from "react-router-dom";

import Header from "../../components/Header";

import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../util/format";
import { Container, ProductTable, Total } from "./styles";


const Cart = (): JSX.Element => {
  const { cart, removeProduct, addProduct } = useCart();
  let history = useHistory()
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

  function handleAddProduct(productId: number,provider:string) {
    addProduct(productId,provider);
  }

  function handleCheckoutProcess() {
    history.push('/Checkout')
  }

  
  return (
    <>
    <Header/>
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
                    <MdRemoveCircleOutline size={20}
                    onClick={() => handleAddProduct(product.id,product.provider)} />
                  </button>
                  <input
                    type="text"
                    data-testid="product-amount"
                    readOnly
                    value={product.amount}
                  />
                  <button type="button" data-testid="increment-product">
                    <MdAddCircleOutline size={20}
                     onClick={() => handleAddProduct(product.id,product.provider)} />
                   
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
        <button onClick={()=>{handleCheckoutProcess()}} type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
    </>
  );
};

export default Cart;
