export interface Product extends ProductEuropean, ProductBrazilian {
  amount:number;
  provider:string;
  discountValue:number;
}

export interface ProductEuropean {
  id: number;
  title: string;
  price: number;
  image: string;
  gallery: string[];
  name: string;
}

export interface ProductBrazilian {
  id: number;
  nome: string;
  descricao: string;
  departamento: string;
  categoria: string;
  preco: number;
  imagem: string;
}

  