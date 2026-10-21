# Firestore

Repositório destinado para exercicios desenvolvidos durante o curso técnico de **Desenvolvimento de Sistemas da Etec de Embu**.

O projeto é uma aplicação web simples, feita com **HTML, CSS e JavaScript puro**, que se conecta ao **Firebase** e ao **Cloud Firestore** (banco NoSQL) para inserir, listar e excluir registros de alunos.

---

## 📂 Estrutura do Repositório

```text
.BD3-NoSQL-FireStore
├── FireStore-Alunos
    ├── index.html
    ├── style.css
    ├── app.js
    └── README.md
```

### Arquivos

| Arquivo      | Descrição                                                                           |
| ------------ | ----------------------------------------------------------------------------------- |
| `index.html` | Estrutura da página: formulário de cadastro e tabela de alunos                      |
| `style.css`  | Estilização da aplicação                                                            |
| `app.js`     | Conexão com o Firebase/Firestore e as operações de inserir, listar e excluir alunos |
| `README.md`  | Documentação do projeto                                                             |

---

## 📚 Atividade

A atividade parte de uma tabela relacional (`tbl_alunos`) que foi reestruturada para o modelo NoSQL do **Firestore**, onde não existem mais registros relacionais, e sim **documentos** com os dados de cada aluno, guardados em uma **coleção**.

| Item           | Valor                  |
| -------------- | ---------------------- |
| Banco de dados | Cloud Firestore        |
| Coleção        | `BD3-NoSQL-Firestore`  |
| Documento      | Um aluno               |
| ID do documento| Gerado pelo Firestore (substitui o `cod_aluno`) |

> A chave estrangeira `cod_turma` foi ignorada, conforme o enunciado.

### Estrutura de um documento

| Campo                  | Tipo no Firestore | Tipo na tabela original |
| ---------------------- | ----------------- | ----------------------- |
| `nome`                 | string            | VARCHAR(100)            |
| `cpf`                  | string            | VARCHAR(11)             |
| `rg`                   | string            | VARCHAR(9)              |
| `telefone_aluno`       | string            | VARCHAR(11)             |
| `telefone_responsavel` | string            | VARCHAR(11)             |
| `email`                | string            | VARCHAR(100)            |
| `data_nascimento`      | **timestamp**     | TIMESTAMP               |

Exemplo de documento:

```json
{
  "nome": "Ryan Santana",
  "cpf": "36985214785",
  "rg": "458874154",
  "telefone_aluno": "11954654123",
  "telefone_responsavel": "1196568762",
  "email": "santana@gmail.com",
  "data_nascimento": "Timestamp (18/04/2004 00:00 - UTC-3)"
}
```

### Operações Trabalhadas

| Operação                         | Descrição                                                          | Função principal                    |
| -------------------------------- | ------------------------------------------------------------------ | ----------------------------------- |
| Conectar ao projeto Firebase     | Inicializa a aplicação com o `firebaseConfig`                      | `initializeApp()`                   |
| Conectar ao Firestore e coleção  | Acessa o banco e a coleção `BD3-NoSQL-Firestore`                   | `getFirestore()` / `collection()`   |
| Inserir um registro de aluno     | Cria um novo documento na coleção                                  | `addDoc()`                          |
| Listar todos os registros        | Busca todos os documentos, ordenados pelo nome                     | `getDocs()` / `query()` / `orderBy()` |
| Excluir um registro de aluno     | Remove um documento pelo seu ID                                    | `deleteDoc()` / `doc()`             |
| Trabalhar com datas *(bônus)*    | Converte a data do formulário em `timestamp` do Firestore          | `Timestamp.fromDate()`              |

### Comparação: SQL x Firestore

| Conceito relacional | Equivalente no Firestore |
| ------------------- | ------------------------ |
| Tabela (`tbl_alunos`) | Coleção (`BD3-NoSQL-Firestore`) |
| Registro / linha    | Documento                |
| Coluna              | Campo                    |
| Chave primária (`cod_aluno`) | ID do documento |
| `INSERT`            | `addDoc()`               |
| `SELECT`            | `getDocs()`              |
| `DELETE`            | `deleteDoc()`            |

---

## 🌟 Implementação bônus: data de nascimento como Timestamp

O campo `data_nascimento` é salvo como **timestamp** (e não como texto). O valor do `<input type="date">` vem no formato `AAAA-MM-DD` e é convertido assim:

```js
const dataNascimento = Timestamp.fromDate(new Date(dataStr + "T00:00:00"));
```

Ao exibir na tabela, o timestamp é convertido de volta para o formato brasileiro:

```js
timestamp.toDate().toLocaleDateString("pt-BR");
```

> 💡 O Console do Firebase mostra o horário no fuso do navegador. Como a data é salva à meia-noite do horário local, o dia exibido no Console é o mesmo que foi digitado.

---

# ☁️ Como configurar o Firebase

O **Firebase** é a plataforma do Google que hospeda o Firestore.

### 1. Acessar o Console

Acesse o Console do Firebase:

https://console.firebase.google.com

Entre com sua conta Google e abra o projeto (ou crie um novo).

### 2. Criar o banco Firestore

1. No menu lateral, clique em **Firestore Database**
2. Clique em **Criar banco de dados**
3. Selecione uma região próxima (por exemplo, `southamerica-east1`)
4. Inicie no **modo de teste**

### 3. Criar a coleção

1. Clique em **Iniciar coleção**
2. Informe o ID da coleção: `BD3-NoSQL-Firestore`
3. Crie um primeiro documento (pode ser de teste)

### 4. Configurar as regras

Na aba **Regras**, para fins de estudo:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

> ⚠️ **Aviso:** essa regra permite que qualquer pessoa leia e escreva no banco. Deve ser utilizada apenas em ambientes de estudo e testes.

### 5. Obter o `firebaseConfig`

1. Clique na engrenagem ⚙️ → **Configurações do projeto**
2. Em **Seus aplicativos**, selecione o app Web
3. Em **Configuração do SDK**, escolha a opção **Config**
4. Copie o objeto `firebaseConfig`

Um exemplo de estrutura é:

```js
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.firebasestorage.app",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000000000"
};
```

---

# 💻 Como executar o projeto no VS Code

### 1. Colar a configuração

Abra o arquivo `app.js` e substitua o bloco `firebaseConfig` pelo que foi copiado do console.

### 2. Instalar a extensão

No VS Code, procure e instale a extensão:

**Live Server**

> Os módulos ES (`import`) não funcionam abrindo o `index.html` com duplo clique. É necessário um servidor local.

### 3. Abrir a aplicação

Clique com o botão direito no `index.html` e selecione **Open with Live Server**. A aplicação abrirá em um endereço parecido com:

```text
http://127.0.0.1:5500
```

### 4. Testar

Para validar a atividade, siga esta ordem:

```text
1 → Inserir um aluno
2 → Conferir na listagem
3 → Conferir o documento no Console do Firebase
4 → Excluir o aluno
```

Essa sequência permite acompanhar o fluxo completo de manipulação dos documentos no Firestore.

---

# 🗄️ Tecnologias utilizadas

* **HTML5**
* **CSS3**
* **JavaScript (ES Modules)**
* **Firebase**
* **Cloud Firestore**
* **NoSQL**
* **Live Server**

---

# 🎓 Sobre o projeto

Este repositório foi desenvolvido para fins **acadêmicos e educacionais**, servindo como registro da atividade prática realizada no componente **Banco de Dados 3** do curso técnico de **Desenvolvimento de Sistemas da Etec de Embu**.

**Professor:** Cristiano Correa de Moraes

O objetivo é documentar a evolução dos conhecimentos relacionados a bancos de dados **NoSQL**, especialmente utilizando o Firestore.
