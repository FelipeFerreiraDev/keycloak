## Realme Roles - F0862
Define o papel de um usuário dentro do Realm, como administrador, usuário, etc.
Elas são usadas para atribuir permissões específicas aos usuários de forma global dentro do Realm.
Além disso, cada cliente (application) pode ter suas próprias Client Roles, permitindo que diferentes aplicações dentro do mesmo Realm tenham regras e permissões distintas e exclusivas.

## Tokens - Exemplo arquivo api.http
ID Token: Serve para confirmar quem é o usuário. Ele basicamente diz "Este é o usuário que fez o login e aqui estão algumas informações sobre ele, como nome e e-mail". É como uma identificação pessoal que comprova que a pessoa está autenticada.

Access Token: Esse token é usado para acessar recursos protegidos. Quando você quer acessar uma API ou serviço em nome do usuário, você usa o Access Token. Ele é como uma chave de acesso para o que você precisa fazer, mas não contém informações sobre o usuário.


## F0867 - Começar por aqui