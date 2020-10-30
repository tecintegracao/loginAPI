# loginAPI
API de login e cadastro de usuário

Para testar é necessário que o serviço mongodb esteja inicializado. No linux, caso esteja instalado: "sudo service mongod start"

Em seguida, na pasta do código: "node src/index.js"

Para testar as rotas utilizei o insomnia.

Rotas POST:

  cadastro:
    http://localhost:3000/auth/cadastrar
  
    body json:
     {
	     "name": "seunome",
	     "email": "seunome@etc.com",
	      "password": "123456"
      }   
  
  login:
    http://localhost:3000/auth/autenticar
  
    body json:
     {
	     "email": "seunome@etc.com",
	      "password": "123456"
      }
     
Rotas GET
  aqui é necessário cadastrar um usuário, e utilizar o token como header no formato Authorization: Bearer Token
  http://localhost:3000/listUsers
  
  Header:
  Authorization   Bearer seuToken
