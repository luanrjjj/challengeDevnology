import React from "react";
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";
import {useHistory } from "react-router-dom";

import Header from "../../components/Header";

import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../util/format";
import { Container, ProductTable, Total } from "./styles";


const Cart = (): JSX.Element => {
  const { cart, removeProduct, addProduct,subtractProduct } = useCart();
  let history = useHistory()
  
  


  
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
     
    
      let sumTotal1=0
       sumTotal1 = sumTotal1 + Number(product?.subTotal);
    
      return (sumTotal = sumTotal + Number(product?.subTotal));
    }, 0)
  );
  


  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  function handleAddProduct(productId: number,provider:string) {
    addProduct(productId,provider);
  }

  function handleSubtractProduct(productId: number,provider:string) {
    subtractProduct(productId,provider);
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
            product.provider==='brazilian_provider'?(
            
              <tr key={product.id} data-testid="product">

              <td>
                <img src={product.imagem} alt={product.title} />
              </td>
              <td>
                <strong>{product.nome}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    data-testid="decrement-product"
                    disabled={product.amount <= 0}
                  >
                    <MdRemoveCircleOutline size={20}
                    onClick={() => handleSubtractProduct(product.id,product.provider)} />
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
            ):(
              <tr key={product.id} data-testid="product">

              <td>
                <img src={product.gallery[0]} alt={product.title} />
              </td>
              <td>
                <strong>{product.name}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    data-testid="decrement-product"
                    disabled={product.amount <= 0}
                  >
                    <MdRemoveCircleOutline size={20}
                    onClick={() => handleSubtractProduct(product.id,product.provider)} />
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
            )
            
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
