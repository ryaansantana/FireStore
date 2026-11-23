// =============================================================
//  ATIVIDADE - REDE SOCIAL (BD3 - Etec de Embu)
//  Back-end: Express + EJS + Socket.io + FireStore DataBase
// =============================================================
const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const ejs = require('ejs');

const { buscarPosts, salvarPost } = require('./src/firebase');

// -------------------------------------------------------------
//  Servidor autocontido (Express rodando dentro do servidor HTTP)
// -------------------------------------------------------------
const app = express();
const server = http.createServer(app);

// Link do socket.io com o servidor autocontido
const io = new Server(server);

// -------------------------------------------------------------
//  Configuração do EJS para abrir a página do front-end (HTML)
// -------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// Rota raiz: exibe o arquivo HTML no navegador
app.get('/', (req, res) => {
    res.render('index.html');
});

// -------------------------------------------------------------
//  Socket.io
// -------------------------------------------------------------
io.on('connection', async (socket) => {
    console.log(`Usuário conectado: ${socket.id}`);

    // previousMessage: envia ao novo usuário todos os posts já gravados
    try {
        const posts = await buscarPosts();
        socket.emit('previousMessage', posts);
    } catch (erro) {
        console.error('Erro ao buscar os posts no Firestore:', erro.message);
        socket.emit('erroPost', 'Não foi possível carregar os posts.');
    }

    // sendMessage: recebe um novo post do formulário
    socket.on('sendMessage', async (dados, confirmar) => {
        if (typeof confirmar !== 'function') confirmar = () => {};

        const titulo = String(dados?.titulo ?? '').trim();
        const conteudo = String(dados?.conteudo ?? '').trim();

        if (!titulo || !conteudo) {
            confirmar({ ok: false, erro: 'Preencha o título e o conteúdo do post.' });
            return;
        }

        const novoPost = {
            titulo: titulo.slice(0, 120),
            conteudo: conteudo.slice(0, 2000),
            criadoEm: Date.now()
        };

        try {
            const postSalvo = await salvarPost(novoPost);

            // receivedMessage: entrega o post a TODOS os usuários conectados
            io.emit('receivedMessage', postSalvo);
            confirmar({ ok: true });
        } catch (erro) {
            console.error('Erro ao salvar o post no Firestore:', erro.message);
            confirmar({ ok: false, erro: 'Não foi possível publicar o post.' });
        }
    });

    socket.on('disconnect', () => {
        console.log(`Usuário desconectado: ${socket.id}`);
    });
});

// -------------------------------------------------------------
//  Inicialização
// -------------------------------------------------------------
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
