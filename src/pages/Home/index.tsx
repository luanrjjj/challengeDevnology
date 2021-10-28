import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdAddShoppingCart, MdProductionQuantityLimits } from "react-icons/md";

import Header from "../../components/Header";
import { useCart } from "../../hooks/useCart";
import { ProductList, SectionFilter } from "./styles";
import {Product,ProductBrazilian,ProductEuropean} from '../../types'




const Home = (): JSX.Element => {
  const [products1, setProducts1] = useState<Product[]>([]);
  const [products2, setProducts2] = useState<Product[]>([]);

  const { register, reset, setError, handleSubmit } = useForm({});

  const { addProduct } = useCart();

  const allProviders = [
    {
      provider: "brazilian_provider",
      products: products1,
    },
    {
      provider: "european_provider",
      products: products2,
    },
  ];

  function handleAddProduct(id: number, provider: string) {
    addProduct(id, provider);
  }

  useEffect(() => {
    async function loadProducts1() {
      fetch(
        "http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider"
      )
        .then((response) => response.json())
        .then((data) => setProducts1(data));
    }
    loadProducts1();
  }, []);

  useEffect(() => {
    async function loadProducts2() {
      fetch(
        "http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider"
      )
        .then((response) => response.json())
        .then((data) => setProducts2(data));
    }
    loadProducts2();
  }, []);
  
 
  return (
    <>
      <Header />
      <SectionFilter>
      <form className="form">
          <div className="form-group">
            <input
              {...register("name")}
              placeholder="Busque pelo nome do item"
              type="name"
              required
            />
            <br />
            <button type="submit">Buscar</button>
            <br />
           
           
             </div>
            </form>
            </SectionFilter>
           
      <ProductList>
        {allProviders.map((provider) => {
          if (provider.provider === "brazilian_provider") {
            return provider.products.map((product: ProductBrazilian) => (
              <li key={product.id}>
                <img alt="" src={product.imagem} />
                <strong>{product.nome}</strong>
                <span>{product.preco}</span>
                <button
                  type="button"
                  data-testid="add-product-button"
                  onClick={() =>
                    handleAddProduct(product.id, provider.provider)
                  }
                >
                  <div data-testid="cart-product-quantity">
                    <MdAddShoppingCart size={16} color="#FFF" />
                  </div>
                  <span>ADICIONAR AO CARRINHO</span>Comprar
                </button>
              </li>
            ));
          } else {
            return provider.products.map((product: ProductEuropean) => (
              <li key={product.id}>
                <div className="GalleryPhotos">
                  {product.gallery.map((imagem: string) => {
                    return (
                      <div className="photo">
                        <img alt="" src={imagem} />
                      </div>
                    );
                  })}
                </div>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
                <button
                  type="button"
                  data-testid="add-product-button"
                  onClick={() =>
                    handleAddProduct(product.id, provider.provider)
                  }
                >
                  <div data-testid="cart-product-quantity">
                    <MdAddShoppingCart size={16} color="#FFF" />
                  </div>
                  <span>ADICIONAR AO CARRINHO</span>Comprar
                </button>
              </li>
            ));
          }
        })}
      </ProductList>
    </>
  );
};

export default Home;
