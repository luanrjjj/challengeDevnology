"Essa loja possui 2 fornecedores, que construíram uma API para você consumir e listar todos os produtos disponíveis nesta loja."

O consumo da parte API foi feito por fetch dentro dos useEffects e armazenados em uma variável para cada fornecedor, posteriormente as duas variáveis foram juntas em 1 unica variável diferenciando os produtos para cada fornecedor.

![image](https://user-images.githubusercontent.com/71605566/139510056-d450dc11-467c-49bb-88fe-ce04e0e1a36d.png)


Para fins do desafio foi suficiente essa forma, porém caso existisse mais fornecedores seria necessário uma estrutração mais abstrata ou uma padronização dos dados oriundos da API.

A busca é feita pelo nome, e é necessário que o nome esteja exatamente igual ao do produto, caso contrário um toast será emitido no canto superior direito da tela. Nessa parte, foge do escopo do projeto, porém poderia ser adicionado um sistema de busca de texto mais eficiente.

Os produtos são salvos e persistidos no carrinho de compras com a utilização do localStorage. Além disso, o fluxo dos dados desde a escolha do produto pelo usuário
 até o Checkout foi feito com useContext no useHook denominado como useCart.
 
 O Checkout sendo finalizado, os dados são salvos no MongoDB em um único schema.
 
Além disso, a parte da responsividade não foi feita, já que não foi uma exigência do desafio.
 

Ao abrir o arquivo do projeto para instalação das dependências contidas no package.json execute yarn no terminal.

Depois da instalação das dependências, também na pasta do diretório execute yarn start para iniciliazar o projeto. Tudo funcionará normalmente sem a necessidade de inicializar o backend, com exceção do checkout que é onde os dados do projetos serão enviados para a API.

A api foi feita em NodeJS, com o framework express e o banco de dado MONGODB. A api apresenta uma estrutura de camadas, que fica evidenciado na parte das pastas, na qual seria facilmente escalada. Único acréscimo feito em termos de estruturação de pastas, seria a separação da pasta useCases em seus componentes : Controllers, Services e DTOS.

O link do repositório do backend : https://github.com/luanrjjj/challengeDevnologyBackend

