import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { Product } from "../types";

interface CartProviderProps {
  children: ReactNode;
}
/*
interface UpdateProductAmount {
  productId: number;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}
*/
interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("RocketShoes:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    console.log("passou aqui");
    try {
      const updatedCart = [...cart];

      const product = await fetch(
        ` http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider/${productId}`
      )
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
      console.log("product", product);

      const newProduct = {
        ...product.data,
        amount: 1,
      };

      updatedCart.push(newProduct);

      setCart(updatedCart);
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(updatedCart));
    } catch {
      toast.error("Erro na adição do produto");
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
          console.log(i);
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
        toast.error("Erro na remoção do produto");
      }
    } catch {
      toast.error("Erro na remoção do produto");
    }
  };

  return (
    <CartContext.Provider value={{ cart, addProduct, removeProduct }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
