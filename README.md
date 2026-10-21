
# Firestore (NoSQL)

Aplicação web simples (HTML, CSS e JavaScript puro) que conecta ao Firebase/Firestore e faz:

- Inserir aluno
- Listar alunos
- Excluir aluno
- Bônus: `data_nascimento` salva como **Timestamp**

Coleção: `BD3-NoSQL-Firestore`

## Campos do documento

| Campo | Tipo |
|---|---|
| nome | string |
| cpf | string |
| rg | string |
| telefone_aluno | string |
| telefone_responsavel | string |
| email | string |
| data_nascimento | timestamp |

(`cod_aluno` vira o ID do documento gerado pelo Firestore; `cod_turma` foi ignorado conforme o enunciado.)

## Como rodar

1. Preencha o `firebaseConfig` em `app.js` com os dados do seu projeto.
2. Rode com um servidor local (módulos ES não funcionam abrindo o arquivo direto): extensão **Live Server** do VS Code ou `npx serve`.
3. Abra no navegador.

Curso Técnico em Desenvolvimento de Sistemas - Etec de Embu
