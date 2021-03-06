import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";

import { Product } from "../types";

interface CartProviderProps {
  children: ReactNode;
}
interface CartContextData {
  cart: Product[];
  addProduct: (productId: number, provider: string) => Promise<void>;
  removeProduct: (productId: number) => void;
  subtractProduct:(productId:number,provier:string) => Promise<void>
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("@RocketShoes:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number, provider: string) => {
    try {
      const updatedCart = [...cart];
      const productExist = updatedCart.find(
        (product) => product.id === productId
      );

      const currentAmount = productExist ? productExist.amount : 0;
      const amount = currentAmount + 1;

      if (productExist) {
        productExist.amount = amount;
      } else {
        if (provider === "brazilian_provider") {
          const product = await fetch(
            ` http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider/${productId}`
          )
            .then((response) => response.json())
            .then((data) => {
              return data;
            });

          const newProduct = {
            ...product,
            amount,
            provider: "brazilian_provider",
          };
          updatedCart.push(newProduct);
        } else {
          const product = await fetch(
            ` http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider/${productId}`
          )
            .then((response) => response.json())
            .then((data) => {
              return data;
            });
          const newProduct = {
            ...product,
            amount,
            provider: "European_provider",
          };
          updatedCart.push(newProduct);
        }
      }
      setCart(updatedCart);
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(updatedCart));
    } catch {
      toast.error("Erro na adi????o do produto");
    }
  };

  const subtractProduct = async (productId: number, provider: string) => {
    try {
      const updatedCart = [...cart];
      const productExist = updatedCart.find(
        (product) => product.id === productId
      );

      const currentAmount = productExist ? productExist.amount : 0;
      let amount = 0 
      if (currentAmount>1) {
            amount = currentAmount - 1;
      } 
      
      if (productExist) {
        productExist.amount = amount;
      } else {
        if (provider === "brazilian_provider") {
          const product = await fetch(
            ` http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider/${productId}`
          )
            .then((response) => response.json())
            .then((data) => {
              return data;
            });

          const newProduct = {
            ...product,
            amount,
            provider: "brazilian_provider",
          };
          updatedCart.push(newProduct);
        } else {
          const product = await fetch(
            ` http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider/${productId}`
          )
            .then((response) => response.json())
            .then((data) => {
              return data;
            });
          const newProduct = {
            ...product,
            amount,
            provider: "European_provider",
          };
          updatedCart.push(newProduct);
        }
      }
      setCart(updatedCart);
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(updatedCart));
    } catch {
      toast.error("Erro na adi????o do produto");
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const updatedCart = [...cart];
      const productExist = updatedCart.find(
        (product) => product.id === productId
      );

      if (productExist) {
        var i;
        for (i = 0; i < updatedCart.length; i++) {
          
          if (updatedCart[i].id === productId) {
            updatedCart.splice(i, 1);
            setCart(updatedCart);
            localStorage.setItem(
              "@RocketShoes:cart",
              JSON.stringify(updatedCart)
            );
          }
        }
      } else {
        toast.error("Erro na remo????o do produto");
      }
    } catch {
      toast.error("Erro na remo????o do produto");
    }
  };

  return (
    <CartContext.Provider value={{ cart, addProduct, removeProduct,subtractProduct }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
