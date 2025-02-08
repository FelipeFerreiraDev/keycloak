# Keycloak - Sistema de Gerenciamento de Identidade e Acesso

## O que é o Keycloak?

O Keycloak é uma solução open source de gerenciamento de identidade e acesso (IAM - Identity and Access Management) desenvolvida pela Red Hat. Ele oferece recursos avançados para autenticação e autorização de aplicações e serviços.

### Principais funcionalidades:

- Single Sign-On (SSO)
- Autenticação via redes sociais
- Autenticação dois fatores (2FA)
- LDAP e Active Directory
- Gerenciamento de usuários e papéis
- Customização de temas
- Suporte a protocolos como OAuth 2.0, OpenID Connect e SAML

## Sobre nossa configuração Docker

O arquivo docker-compose.yaml atual configura:

- Container Keycloak na versão mais recente
- Banco de dados MySQL para persistência
- Rede dedicada para comunicação entre containers
- Variáveis de ambiente para configuração inicial
- Portas expostas para acesso externo

## Pré-requisitos
- Docker e Docker Compose instalados
## Como executar
1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

2. Navegue até o diretório do projeto:
```bash
cd seu-repositorio
```

3. Execute o Docker Compose para iniciar os containers:
```bash
docker-compose up -d
```

4. Acesse o Keycloak em http://localhost:8080
    - Usuário: admin
    - Senha: admin

## Observações importantes
- As credenciais estão em texto plano (não recomendado para produção)
- Usar variáveis de ambiente ou secrets para senhas em ambiente de produção
- O volume ./.docker/dbdata persiste os dados do MySQL entre reinícios

## Comandos úteis
### Parar containers
```bash
docker compose down
```

#### Visualizar logs
```bash
docker compose logs -f
```

### Remover volumes (limpar dados)
```bash	
docker compose down -v
```

## Segurança e Boas Práticas
- Usar variáveis de ambiente para configuração sensível
- Proteger o acesso ao Keycloak com autenticação forte
- Configure TLS/HTTPS
- Restringir acesso aos endpoints sensíveis