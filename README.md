# 🚀 API — Exercícios de APIs e Web Services

> 📚 Projeto acadêmico desenvolvido durante o **3º semestre (2026.2)** da graduação.

Este projeto foi desenvolvido para praticar os conceitos estudados na disciplina de **APIs e Web Services**, utilizando **Node.js** e **Express**.

A aplicação reúne diferentes exercícios de lógica e regras de negócio, disponibilizados através de **endpoints HTTP** que recebem e retornam dados em formato **JSON**.

> 💡 **Projeto desenvolvido exclusivamente para aprendizado e prática durante a graduação.**

---

## 🛠️ Tecnologias

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white" alt="JSON">
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
</p>

---

## 📖 Sobre o projeto

O servidor possui diferentes **endpoints**, cada um responsável por um exercício de programação.

Os exercícios trabalham com recebimento de dados através de requisições `POST`, processamento das informações e retorno de uma resposta em `JSON`.

### 📌 Exercícios disponíveis

| 🔗 Endpoint      | 📝 Descrição                              |
| ---------------- | ----------------------------------------- |
| `/aprovacao`     | 🎓 Verificação da situação de um aluno    |
| `/financiamento` | 🚗 Análise básica de financiamento        |
| `/restaurante`   | 🍔 Cálculo de pedido, descontos e entrega |
| `/salario`       | 💰 Cálculo de salário e descontos         |
| `/energia`       | ⚡ Cálculo de consumo de energia           |
| `/pontuacao`     | 📊 Sistema de pontuação de funcionário    |
| `/nota-fiscal`   | 🧾 Cálculo de nota fiscal                 |
| `/agua`          | 💧 Cálculo de consumo de água             |
| `/hotel`         | 🏨 Simulação de reserva de hotel          |
| `/cadastro`      | 👤 Validação de cadastro de usuário       |

---

## 📂 Estrutura do projeto

```text
📦 projeto
 ├── 📁 node_modules/
 ├── 📄 server.js
 ├── 📄 package.json
 ├── 📄 package-lock.json
 └── 📄 .gitignore
```

> 🔒 A pasta `node_modules` não é enviada para o GitHub, pois está incluída no `.gitignore`.

---

## ⚙️ Como executar

### 1️⃣ Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta:

```bash
cd nome-do-projeto
```

---

### 2️⃣ Instale as dependências

Como a pasta `node_modules` não é versionada no GitHub, é necessário instalar novamente as dependências:

```bash
npm install
```

📦 O `npm` irá utilizar o `package.json` para instalar as dependências necessárias do projeto.

---

### 3️⃣ Inicie o servidor

```bash
node server.js
```

Se houver um script configurado no `package.json`, também poderá ser utilizado:

```bash
npm start
```

Se tudo estiver funcionando corretamente, será exibida uma mensagem semelhante a:

```text
🚀 servidor rodando porta: 3005
```

A API estará disponível em:

```text
http://localhost:3005
```

---

## 🧪 Testando a API

Você pode utilizar ferramentas como:

* 🟠 **Postman**
* 🟣 **Insomnia**
* 🔵 **Thunder Client**
* 💻 Extensões de API do **Visual Studio Code**

As requisições devem ser enviadas utilizando o método:

```text
POST
```

com os dados no corpo da requisição em formato:

```text
JSON
```

---

## 📌 Exemplo

### 🎓 Endpoint `/aprovacao`

**Requisição:**

```http
POST http://localhost:3005/aprovacao
```

**Body:**

```json
{
  "nome": "João Silva",
  "nota1": 7,
  "nota2": 8,
  "frequencia": 90,
  "trabalho": 0.5
}
```

**Resposta:**

```json
{
  "nome": "João Silva",
  "nota1": 7,
  "nota2": 8,
  "frequencia": 90,
  "trabalho": 0.5,
  "mediaFinal": 7.5,
  "situacao": "Aprovado"
}
```

---

## 🧠 Conceitos praticados

Durante o desenvolvimento, foram praticados conceitos como:

* 🚀 Criação de servidor com **Node.js**
* ⚡ Utilização do **Express**
* 🔗 Criação de rotas HTTP
* 📩 Recebimento de dados através do `req.body`
* 📤 Retorno de respostas com `res`
* 🧾 Formato JSON
* 🔢 Conversão e manipulação de dados
* ✅ Validação de informações
* 🔀 Estruturas condicionais
* 💻 Regras de negócio
* 🌐 Métodos HTTP
* 📊 Status HTTP (`200`, `201`, `400`)
* 📦 Gerenciamento de dependências com `npm`
* 🚫 Utilização do `.gitignore`
* 🐙 Versionamento com Git e GitHub

---

## 📚 Objetivo

O principal objetivo deste projeto é **aprender na prática como funciona o desenvolvimento de APIs utilizando Node.js e Express**.

Este projeto faz parte do meu processo de aprendizado no **3º semestre da graduação (2026.2)** e poderá receber melhorias conforme novos conceitos forem aprendidos.

---

## 👨‍💻 Autor

**Guilherme Vila Verde**

🎓 Estudante de Desenvolvimento de Tecnologias Digitais — Sistemas para Internet

📅 **3º semestre — 2026.2**

---

<p align="center">
  📚 Projeto acadêmico • 🚀 Node.js + Express • 💻 Desenvolvido para aprendizado
</p>
