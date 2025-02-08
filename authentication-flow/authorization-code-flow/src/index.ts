import express from 'express';

const app = express();

app.get('/login', (req, res) => {
  const loginParams = new URLSearchParams({
    client_id: 'fullcycle-client', // Client definido no Keycloak
    redirect_uri: 'http://localhost:3000/callback', // Endereço de redirecionamento, vai capturar o resultado da autenticação
    response_type: 'code', // Tipo de resposta, no caso, código de autorização
    scope: 'openid', // Da o acesso ao ID Token
  });

  const url = `http://localhost:8080/realms/fullcycle-realm/protocol/openid-connect/auth?${loginParams.toString()}`;
  console.log(url);
  res.redirect(url);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});