import React, { useState, useEffect } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import Header from "../../components/Header";
import { useCart } from "../../hooks/useCart";
import { ProductList } from "./styles";

interface Product {
  id: number;
  nome: string;
  descricao: string;
  departamento: string;
  categoria: string;
  preco: number;
  imagem: string;
}

interface ProductEuropean {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductCart {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products1, setProducts1] = useState([]);
  const [products2, setProducts2] = useState([]);

  const { addProduct, removeProduct } = useCart();

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

  function handleAddProduct(id: number) {
    addProduct(id);
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

  console.log("1", products1);
  console.log("2", products2);
  /*
 allProviders.map(provider=>{
    provider.provider=='brazilian_provider'? (provider.products.map((product)=>{
      console.log('brazilian',product)
    }))
   :
   (
     provider.products.map((product)=>{
      console.log('european',product)
    })
   )
    
  })
  
*/
  return (
    <>
      <Header />
      <ProductList>
        {allProviders.map((provider) => {
          if (provider.provider === "brazilian_provider") {
            return provider.products.map((product: Product) => (
              <li key={product.id}>
                <img alt="" src={product.imagem} />
                <strong>{product.nome}</strong>
                <span>{product.preco}</span>
                <button
                  type="button"
                  data-testid="add-product-button"
                  onClick={() => handleAddProduct(product.id)}
                >
                  <div data-testid="cart-product-quantity">
                    <MdAddShoppingCart size={16} color="#FFF" />
                  </div>
                  <span>ADICIONAR AO CARRINHO</span>Comprar
                </button>
              </li>
            ));
          } else {
            return provider.products.map((product: any) => (
              <li key={product.id}>{product.name}</li>
            ));
          }
        })}
      </ProductList>
    </>
  );
};

export default Home;
