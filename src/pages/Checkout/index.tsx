/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { css } from "styled-components";

import Header from "../../components/Header";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container } from "./styles";
import { usePaymentInputs, PaymentInputsWrapper } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import { formatPrice } from "../../util/format";
import { api } from "../../services/api";

import { Product } from "../../types";


const schema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().min(8).max(32).required(),
});

const CheckoutComponent = (): JSX.Element => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("@RocketShoes:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const cartFormatted = cart?.map((product) =>
    product.provider === "brazilian_provider"
      ? {
          ...product,
          priceFormatted: formatPrice(product.preco),
          subTotal: product.preco * product.amount,
        }
      : {
          ...product,
          priceFormatted: formatPrice(product.price),
          subTotal:
            product.price *
            product.amount *
            (1 - Number(product.discountValue)),
        }
  );

  const total = formatPrice(
    cartFormatted?.reduce((sumTotal, product) => {
      
      let sumTotal1 = 0;
      sumTotal1 = sumTotal1 + Number(product?.subTotal);
     
      return (sumTotal = sumTotal + Number(product?.subTotal));
    }, 0)
  );

  const { getExpiryDateProps, getCVCProps, wrapperProps, getCardImageProps } =
    usePaymentInputs();

  const registerHandler = async (data: any) => {
    

     const response = await api.post('/statement', {
       user_name:data.name,
       user_cpf:data.cpf,
       user_email:data.email,
       cart:cart,
       created_at:Date.now()


    })
    //reset();
    return response
    
    
  };

  return (
    <>
      <Header />
      <Container>
        <form onSubmit={handleSubmit(registerHandler)}>
          <div className="form-group">
            <h1>Valor Total: {total}</h1>

            <input
              {...register("name")}
              placeholder="Digite seu Nome"
              type="name"
              required
            />
            <br />
            <input
              {...register("email")}
              placeholder="Digite seu Email"
              type="email"
              required
            />
            <br />
            <input
              {...register("cpf")}
              placeholder="Digite seu CPF"
              type="CPF"
              required
            />

            <br />

            <PaymentInputsWrapper
              {...wrapperProps}
              styles={{
                fieldWrapper: {
                  base: css`
                    margin-bottom: 1rem;
                  `,
                },
                inputWrapper: {
                  base: css`
                    border-color: green;
                  `,
                  errored: css`
                    border-color: maroon;
                  `,
                  focused: css`
                    border-color: unset;
                    box-shadow: unset;
                    outline: 2px solid blue;
                    outline-offset: 2px;
                  `,
                },
                input: {
                  base: css`
                    color: green;
                  `,
                  errored: css`
                    color: maroon;
                  `,
                  cardNumber: css`
                    width: 15rem;
                  `,
                  expiryDate: css`
                    width: 10rem;
                  `,
                  cvc: css`
                    width: 5rem;
                  `,
                },
                errorText: {
                  base: css`
                    color: maroon;
                  `,
                },
              }}
            >
              <div className="Payment">
                <svg {...getCardImageProps({ images })} />
                <input
                  {...register("cardNumber")}
                  placeholder="Número do Cartão"
                  type="name"
                  required
                  className="CardNumber"
                />
                <input {...getExpiryDateProps()} />
                <input {...getCVCProps()} />
              </div>
            </PaymentInputsWrapper>
            <br />
            <button type="submit">Pagar</button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default CheckoutComponent;
