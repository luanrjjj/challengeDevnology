/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdAddShoppingCart } from "react-icons/md";

import Header from "../../components/Header";
import { useCart } from "../../hooks/useCart";
import { ProductList, SectionFilter } from "./styles";
import { Product, ProductBrazilian, ProductEuropean } from "../../types";
import { toast } from "react-toastify";

interface ItemInformations {
  products: Product[];
  provider: string;
}

const Home = (): JSX.Element => {
  const [products1, setProducts1] = useState<Product[]>([]);
  const [products2, setProducts2] = useState<Product[]>([]);
  const [filter, setFilter] = useState("");
  const [sortProduct, setSortProduct] = useState<ItemInformations[]>([]);

  const { register, handleSubmit } = useForm({});

  const { addProduct } = useCart();

  const allProducts = [
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

  const handleFilterNameProduct = (data) => {
    const name = data.name;
    let itemsFoundTotal: ItemInformations[] = [];
    allProducts.map((products) => {
      if (products.provider === "brazilian_provider") {
        const itemsFound = products1.filter((product) => product.nome === name);

        if (itemsFound.length>0) {
          itemsFoundTotal.push({
            provider: products.provider,
            products: itemsFound,
          });
        }
      }
      if (products.provider === "european_provider") {
        const itemsFound1 = products2.filter(
          (product) => product.name === name
        );

        if (itemsFound1.length>0) {
          itemsFoundTotal.push({
            provider: products.provider,
            products: itemsFound1,
          });
        }
        if (itemsFoundTotal.length>0) {
        setSortProduct(itemsFoundTotal);
        } else {
          toast.error('Produto não encontrado')
        }
      }
    });
  };

  function handleInputChange(event) {
    setFilter(event.target.value);
  }

  async function loadAllProducts() {
    await fetch(
      "http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider"
    )
      .then((response) => response.json())
      .then((data) => setProducts1(data));

    await fetch(
      "http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider"
    )
      .then((response) => response.json())
      .then((data) => setProducts2(data));
  }

  useEffect(() => {
    loadAllProducts();
  }, []);

 
  return (
    <>
      <Header />
      <SectionFilter>
        <form onSubmit={handleSubmit(handleFilterNameProduct)} className="form">
          <div className="form-group">
            <input
              {...register("name")}
              placeholder="Busque pelo nome do item"
              type="text"
              value={filter}
              onChange={handleInputChange}
              required
            />
            <br />
            <button type="submit">Buscar</button>
            <br />
          </div>
        </form>
      </SectionFilter>

      <ProductList>
        {sortProduct?.length > 0
          ? sortProduct.map((provider) => {
              if (provider.provider === "brazilian_provider") {
                return provider.products.map((product: ProductBrazilian) => (
                  <li key={product.id}>
                    <img alt="" src={product.imagem} />
                    <strong>{product.nome}</strong>
                    <span> R$ {product.preco}</span>
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
                    <span>R$ {product.price}</span>
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
                      <span>ADICIONAR AO CARRINHO</span> Comprar
                    </button>
                  </li>
                ));
              }
            })
          : allProducts.map((provider) => {
              if (provider.provider === "brazilian_provider") {
                return provider.products.map((product: ProductBrazilian) => (
                  <li key={product.id}>
                    <img alt="" src={product.imagem} />

                    <strong>{product.nome}</strong>
                    <span>R$ {product.preco}</span>
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
                      <div className="photo">
                        <img
                          alt={product.gallery[0]}
                          src={product.gallery[0]}
                        />
                      </div>
                    </div>

                    <strong>{product.name}</strong>
                    <span>$ {product.price}</span>
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
                      <span>ADICIONAR AO CARRINHO</span> Comprar
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
