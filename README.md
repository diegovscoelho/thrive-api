# Thrive API

Backend da aplicação de controle financeiro **Thrive**, desenvolvido para gerenciar usuários e transações de forma segura e escalável.

## Tecnologias Utilizadas

- **Node.js** e **Express** – Desenvolvimento da API REST.  
- **PostgreSQL** – Banco de dados relacional.  
- **bcrypt** – Hash seguro de senhas.  
- **dotenv** – Gerenciamento de variáveis de ambiente.  
- **JWT (JSON Web Token)** – Autenticação baseada em tokens.  

## Funcionalidades

### Usuários
- Registro com validação de dados e hash de senhas.  
- Autenticação com geração de tokens JWT.  
- Gerenciamento de perfis.  

### Transações
- Criação, consulta, edição e exclusão de transações financeiras.  
- Classificação por categorias.  
- Controle de entradas e saídas.  

## Segurança
- Armazenamento de senhas com bcrypt.  
- Autenticação e autorização com JWT.  
- Implementação de boas práticas para proteção contra SQL Injection e XSS.  
