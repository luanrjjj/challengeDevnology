"Essa loja possui 2 fornecedores, que construíram uma API para você consumir e listar todos os produtos disponíveis nesta loja."

O consumo da parte API foi feito por fetch dentro dos useEffects e armazenados em uma variável para cada fornecedor, posteriormente as duas variáveis foram juntas em 1 unica variável diferenciando os produtos para cada fornecedor.

![image](https://user-images.githubusercontent.com/71605566/139510056-d450dc11-467c-49bb-88fe-ce04e0e1a36d.png)


Para fins do desafio foi suficiente essa forma, porém caso existisse mais fornecedores seria necessário uma estrutração mais abstrata ou uma padronização dos dados oriundos da API.

Os produtos são salvos e persistidos no carrinho de compras com a utilização do localStorage. Além disso, o fluxo dos dados desde a escolha do produto pelo usuário
 até o Checkout foi feito com useContext no useHook denominado como useCart.
 
 O Checkout sendo finalizado, os dados são salvos no MongoDB em um único schema.
 
 

Ao abrir o arquivo do projeto para instalação das dependências contidas no package.json execute yarn no terminal.

Depois da instalação das dependências, também na pasta do diretório execute yarn start para iniciliazar o projeto.



In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

