<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recuperação de Senha</title>
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
  </style>
</head>

<body>
  <div style="text-align: center;">
    <h1>Recuperação de Senha</h1>
    <p>Clique no link abaixo para acessar a página de recuperação de senha. Caso não tenha sido você que realizou essa solicitação, apenas deseconsidere essa mensagem.</p>
    <p>
      <a href="{{ env('APP_URL') }}/reset/{{ $token }}">
        {{ env('APP_URL') }}/reset/{{ $token }}
      </a>
    </p>
    {{ env('APP_NAME') }} - Todos os direitos reservados
  </div>
</body>

</html>