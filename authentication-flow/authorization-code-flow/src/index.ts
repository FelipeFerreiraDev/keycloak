import express from 'express';
import crypto from 'crypto';
import session from "express-session";
import jwt from "jsonwebtoken";

const app = express();

const memoryStore = new session.MemoryStore();

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
    store: memoryStore,
    //expires
  })
);

const middlewareIsAuth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  //@ts-expect-error - type mismatch
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  next();
};

app.get('/login', (req, res) => {
  // Nonce valor aleatório para o código de autorização - guardado na sessão do usuário
  const nonce = crypto.randomBytes(16).toString('base64');
  const state = crypto.randomBytes(16).toString("base64");

  //@ts-expect-error - type mismatch
  req.session.nonce = nonce;
  //@ts-expect-error - type mismatch
  req.session.state = state;
  req.session.save();

  const loginParams = new URLSearchParams({
    client_id: 'fullcycle-client', // Client definido no Keycloak
    redirect_uri: 'http://localhost:3000/callback', // Endereço de redirecionamento, vai capturar o resultado da autenticação
    response_type: 'code', // Tipo de resposta, no caso, código de autorização
    scope: 'openid', // Da o acesso ao ID Token
    nonce,
    state
  });

  const url = `http://localhost:8080/realms/fullcycle-realm/protocol/openid-connect/auth?${loginParams.toString()}`;
  console.log(url);
  res.redirect(url);
});

app.get("/logout", (req, res) => {
  const logoutParams = new URLSearchParams({
    //@ts-expect-error - type mismatch
    id_token_hint: req.session.id_token ? req.session.id_token : "",
    post_logout_redirect_uri: "http://localhost:3000/login",
  });

  req.session.destroy((err) => {
    console.error(err);
  });

  const url = `http://localhost:8080/realms/fullcycle-realm/protocol/openid-connect/logout?${logoutParams.toString()}`;
  res.redirect(url);
});

app.get('/callback', async (req, res) => {
  //@ts-expect-error - type mismatch
  if (req.session.user) {
    return res.redirect("/admin");
  }


  console.log("Query state:", req.query.state, typeof req.query.state);
  //@ts-expect-error - type mismatch
  console.log("Session state:", req.session.state, typeof req.session.state);
  //@ts-expect-error - type mismatch
  if(String(req.query.state) !== String(req.session.state)) {
    //poderia redirecionar para o login em vez de mostrar o erro
    return res.status(401).json({ message: "Unauthenticated" });
  }

  console.log(req.query);

  const bodyParams = new URLSearchParams({
    client_id: 'fullcycle-client',
    grant_type: 'authorization_code',
    code: req.query.code as string,
    redirect_uri: 'http://localhost:3000/callback', // Deve ser o mesmo que foi passado no login
  });

  const url = `http://host.docker.internal:8080/realms/fullcycle-realm/protocol/openid-connect/token`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: bodyParams.toString(),
  });

  const result = await response.json();

  console.log(result);
  const payloadAccessToken = jwt.decode(result.access_token) as any;
  const payloadRefreshToken = jwt.decode(result.refresh_token) as any;
  const payloadIdToken = jwt.decode(result.id_token) as any;

  if (  
    //@ts-expect-error - type mismatch
    payloadAccessToken!.nonce !== req.session.nonce ||
    //@ts-expect-error - type mismatch
    payloadRefreshToken.nonce !== req.session.nonce ||
    //@ts-expect-error - type mismatch
    payloadIdToken.nonce !== req.session.nonce
  ) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  console.log(payloadAccessToken);
  //@ts-expect-error - type mismatch
  req.session.user = payloadAccessToken;
  //@ts-expect-error - type mismatch
  req.session.access_token = result.access_token;
  //@ts-expect-error - type mismatch
  req.session.id_token = result.id_token;
  req.session.save();
  res.json(result);
});

app.get("/admin", middlewareIsAuth, (req, res) => {
  //@ts-expect-error - type mismatch
  res.json(req.session.user);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});