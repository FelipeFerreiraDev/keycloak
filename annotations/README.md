## Realme Roles - F0862
Define o papel de um usuário dentro do Realm, como administrador, usuário, etc.
Elas são usadas para atribuir permissões específicas aos usuários de forma global dentro do Realm.
Além disso, cada cliente (application) pode ter suas próprias Client Roles, permitindo que diferentes aplicações dentro do mesmo Realm tenham regras e permissões distintas e exclusivas.

## Tokens - Exemplo arquivo api.http
ID Token: Serve para confirmar quem é o usuário. Ele basicamente diz "Este é o usuário que fez o login e aqui estão algumas informações sobre ele, como nome e e-mail". É como uma identificação pessoal que comprova que a pessoa está autenticada.

Access Token: Esse token é usado para acessar recursos protegidos. Quando você quer acessar uma API ou serviço em nome do usuário, você usa o Access Token. Ele é como uma chave de acesso para o que você precisa fazer, mas não contém informações sobre o usuário.


## Criando redirecionamento para o keycloak - F0870
É importante preencher o campo "Valid Redirect URIs" com o endereço do seu frontend. Isso define para onde o Keycloak pode redirecionar o usuário após a autenticação.

O campo "Web Origins" funciona como uma configuração de CORS, onde você pode definir quais domínios têm permissão para fazer requisições ao seu backend autenticado pelo Keycloak. Se estiver em dúvida, você pode usar "*" para permitir qualquer origem (não recomendado para produção).

O Root URL é um atalho para facilitar a configuração de redirecionamentos e acessos seguros dentro do Keycloak, especialmente quando há múltiplas rotas e domínios. Embora não seja obrigatório, ele pode ajudar a padronizar a configuração e evitar erros.