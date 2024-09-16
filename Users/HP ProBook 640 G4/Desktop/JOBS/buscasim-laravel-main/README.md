# BuscaSim - Consulta de placas automotivas

O BuscaSim é uma plataforma onde os usuários podem consultar qualquer placa, e receber todas as informações do veículo.

## Fluxo de consulta e finalização da compra

1. O cliente faz a pesquisa de uma placa na página inicial.

   - 1.1 Caso a placa esteja no formato errado, ou seja inválida, a API retorna um erro.

2. Após a pesquisa, são exibidas as informações gratuitas da consulta.

   - 2.1 Caso o usuário atualize a página, a consulta gratuita deverá ser refeita.
   - 2.2 O cliente poderá optar por liberar as informações bloqueadas, e ser redirecionado para o pagamento.

3. Para visualizar as informações bloqueadas, o cliente deverá realizar o pagamento.

   - 3.1 O cliente deverá informar CPF, Nome, E-mail.
   - 3.2 O cliente poderá informar um cupon promocional para obter um desconto no valor.
   - 3.2.1 O Cupon vai aplicar uma porcentagem do valor total, ou um valor fixo como desconto.
   - 3.2.2 O Cupon deverá ser uma palavra única composta por letras e números em caixa alta.
   - 3.2.3 O Cupon deverá possuir uma data de expiração, pode ser ativado ou desativado.
   - 3.3 Após confirmar o pagamento, será gerado um QRCode e um código PIX
   - 3.4 O cliente deverá escanear ou copiar o código PIX para efetuar o pagamento.
   - 3.5 Após a confirmação do pagamento via websocket, o cliente será redirecionado para a página de resultados com as informações liberadas.
   - 3.5.1 Caso o cliente atualize ou saia da página, ele deverá acessar a página "Minhas Consultas" para visualizar as informações.

4. Para acessar as consultas já realizadas, o cliente deverá informar seu e-mail e cpf na página minhas consultas.

5. Na página minhas consultas, o cliente poderá visualizar as informações das consultas que foram pagas.
   - 5.1 As informações vão ser as mesmas do momento em que a consulta foi efetuada.

## Executar o projeto localmente utilizando o Xampp

**Requisitos**

- [XAMPP](https://www.apachefriends.org/pt_br/index.html)
- PHP 8.2+ (Vem instalado com o XAMPP)
- [Node v20+](https://nodejs.org/en/download/current)

### Verificando se o PHP está instalado.

Abra um terminal e digite o seguinte comando:

`php -v`

É necessário que a versão do PHP seja 8.2 ou superior. Em caso de erro, verifique se o diretório de instalação do PHP está configurado corretamente nas variáveis de ambiente.

> **Sugestão:**
> Caso tenha instalado o Xampp, o diretório de instalação do PHP se encontra em `C:\xampp\php`.

### Verificando se o Node está instalado

Abra um terminal e digite o seguinte comando:

`node -v`

É necessário que a versão do Node seja 20.\* ou superior. Em caso de erro, verifique se a instalação do Node foi realizada de forma correta.

### Clonando e configurando o projeto

Abra um terminal e navegue até o diretório onde deseja clonar o projeto, então copie e cole o seguinte comando:

`git clone https://github.com/FelipeOliveiraDvP/buscasim-laravel.git`

Acesse o diretório do projeto e faça uma cópia do arquivo `.env.example` para um arquivo `.env`. [https://laravel.com/docs/10.x/configuration](https://laravel.com/docs/10.x/configuration).

No arquivo `.env`, procure a seção referente a conexão com o banco de dados, e atualize com as informações do seu MySQL local

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nome_do_banco
DB_USERNAME=root
DB_PASSWORD=
```

### Instalando as dependências

Para instalar as dependências do Laravel, você precisa possuir o [composer](https://getcomposer.org/) instalado na versão 2.7.6. Acesse a raiz do projeto com um terminal, e execute o seguinte comando:

`composer update`

Após a instalação das dependências do Laravel, é necessário gerar uma chave para o aplicativo com o comando a seguir:

`php artisan key:generate`


Agora, é necessário realizar a migração das tabelas:

`php artisan migrate`

Em seguida, importe e execute os seeders, incluindo os seeders das configurações das páginas, caso contrário, você verá um erro 404 em todas as páginas, pois elas são renderizadas dinamicamente atraves do [puckeditor](https://puckeditor.com/).

`php artisan db:seed`
`php artisan db:seed --class=PageSeeder`

Agora, é necessário realizar a instalação das dependências do frontend, para esse projeto desenvolvido em [React JS v18](https://react.dev/) e com a biblioteca de componentes [Mantine v7](https://mantine.dev/). Ainda no terminal, execute o seguinte comando:


`npm install`

### Executando o projeto

Após todas as dependências instaladas, acesse a raiz do projeto com um terminal, e execute o seguinte comando:

`npm start`

O projeto será iniciado, e poderá ser acessado através da porta [http://localhost:8000](http://localhost:8000).

Você poderá encontrar a documentação dos endpoints disponíveis acessando a página [http://localhost:8000/request-docs](http://localhost:8000/request-docs).

## Deploy em hospedagem compartilhada

As hospedagens compartilhadas, geralmente servem os arquivos a partir da pasta `public_html`. Para redirecionar as requisições do servidor para a pasta `public` do Laravel, adicione um arquivo `.htaccess` na raiz do projeto com o conteúdo abaixo:

```
# Block direct requests to the "public" subdirectory
RewriteCond %{ENV:REDIRECT_STATUS} ^$
RewriteRule ^public($|/) - [R=404]

# Rewrite all requests that are not already for the "public" subdirectory
RewriteRule !^public/ /public%{REQUEST_URI} [L]
```

> **Sugestão:**
> Você pode adicionar o conteúdo desse arquivo nos secrets, e criar durante a execução da pipeline.
