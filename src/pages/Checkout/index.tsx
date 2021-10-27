import React, { useState } from "react";
import { useForm } from 'react-hook-form'

import Header from "../../components/Header";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container } from "./styles";

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

const schema = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().min(8).max(32).required(),
  });

const CheckoutComponent = (): JSX.Element => {
const {
    register,
    reset,
    setError,
    handleSubmit,
} = useForm({
    resolver:yupResolver(schema),
})
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  

  const registerHandler = (data:any) => {
      console.log(data);
      reset();
  }


  return (
    <>
    <Header/>
    <Container>
        <form onSubmit={handleSubmit(registerHandler)}>
            <div className="form-group">
                <label htmlFor="name">Name</label>

                <input
                {...register('name')} placeholder="name" type="name" required/>  

            <input {...register("email")} placeholder="email" type="email" required />
            <br />
            <button type="submit">Sign in</button>
            
            
            </div>

        </form>
    </Container>
    </>
  );
};

export default CheckoutComponent;
