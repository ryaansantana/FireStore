# 🌐 Atividade - Rede Social com FireStore DataBase

Protótipo de rede social desenvolvido para o componente **Banco de Dados 3** do curso técnico de **Desenvolvimento de Sistemas – Etec de Embu**.

Os posts são gravados no **FireStore DataBase** (NoSQL) e distribuídos em **tempo real** para todos os usuários conectados com **Socket.io**, usando os mesmos conceitos do aplicativo de *CHAT* visto em aula.

---

## 🛠️ Tecnologias

| Camada    | Tecnologias |
|-----------|-------------|
| Back-end  | Node.js, Express, EJS, Socket.io, Firebase (Firestore), Mongoose, Nodemon |
| Front-end | HTML, CSS, JavaScript, jQuery (CDN), Socket.io client (CDN) |
| Banco     | FireStore DataBase – coleção `posts` |

---

## 📁 Estrutura de pastas

```
bd3-atv-rede-social-firestore-ryan/
├── public/
│   ├── css/
│   │   └── style.css       # estilos da página
│   ├── img/
│   │   └── logo.svg        # logo do topo
│   ├── js/
│   │   └── main.js         # socket.io do front-end + renderização dos posts
│   └── index.html          # página aberta pelo EJS
├── src/
│   └── firebase.js         # conexão com o Firestore + busca/gravação de posts
├── server.js               # servidor autocontido (Express + Socket.io)
├── package.json
└── README.md
```

---

## ✅ Funcionalidades implementadas

**Back-end**
- Instalação dos pacotes `nodemon`, `ejs`, `express`, `mongoose` e `socket.io`
- Servidor autocontido (`http.createServer(app)`)
- Socket.io ligado ao servidor autocontido
- EJS configurado para renderizar o arquivo HTML do front-end
- Rota raiz `/` exibindo a página no navegador
- Conexão com o FireStore DataBase
- Busca de todos os posts já realizados (ordenados por data)
- Evento `connection` do Socket.io
- Estratégias `previousMessage`, `sendMessage` e `receivedMessage`

**Front-end**
- jQuery e Socket.io importados por CDN
- Socket.io do front-end conectado ao back-end
- Função que renderiza os posts já cadastrados
- Estratégias `previousMessage` e `receivedMessage`
- Envio de posts pelo formulário do modal *"FAÇA UM POST"*

---

## 🔄 Fluxo dos eventos

```
Navegador                         Servidor                       Firestore
    │ ── connection ───────────────▶ │                                │
    │                                │ ── getDocs(posts) ───────────▶ │
    │ ◀── previousMessage (posts) ── │ ◀──────────────────────────────│
    │                                │                                │
    │ ── sendMessage {titulo,...} ─▶ │ ── addDoc(posts) ────────────▶ │
    │ ◀── receivedMessage (todos) ── │                                │
```

---

## 🗄️ Documento salvo no Firestore

Coleção: **`posts`**

```json
{
  "titulo": "Teste de titulo de post.",
  "conteudo": "Lorem ipsum dolor sit amet...",
  "criadoEm": 1763928732000
}
```

---

## ▶️ Como executar

1. Clone o repositório e instale as dependências:
   ```bash
   git clone https://github.com/SEU-USUARIO/bd3-atv-rede-social-firestore-ryan.git
   cd bd3-atv-rede-social-firestore-ryan
   npm install
   ```
2. No [Console do Firebase](https://console.firebase.google.com/), abra o projeto, vá em **Configurações do projeto → Seus apps** e copie o objeto `firebaseConfig` para o arquivo `src/firebase.js`.
3. Em **Firestore Database → Regras**, deixe a leitura/escrita liberada (modo de teste).
4. Inicie o servidor:
   ```bash
   npm run dev     # com nodemon
   # ou
   npm start
   ```
5. Acesse **http://localhost:3000** — abra em duas abas para ver os posts chegando em tempo real.

---

👨‍💻 Desenvolvido por **Ryan** – Etec de Embu
👨‍🏫 Professor: Cristiano Correa de Moraes
