// =============================================================
//  Front-end: conecta o socket.io do navegador com o back-end
// =============================================================
const socket = io();

// Formata a data no padrão das imagens: [18/4/2025 - 18:45:12]
function formatarData(timestamp) {
    const d = new Date(timestamp);
    const hora = d.toLocaleTimeString('pt-BR');
    return `[${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} - ${hora}]`;
}

// Renderiza UM post no feed (usa .text() para evitar injeção de HTML)
function renderizarPost(post) {
    $('#avisoVazio').remove();

    const $post = $('<article class="post"></article>');
    $post.append($('<h3></h3>').text(post.titulo));
    $post.append($('<p></p>').text(post.conteudo));
    $post.append($('<p class="data"></p>').text(formatarData(post.criadoEm)));

    $('#posts').append($post);
    return $post;
}

// Renderiza todos os posts já cadastrados
function renderizarPosts(posts) {
    $('#posts').empty();

    if (!posts.length) {
        $('#posts').append('<p class="aviso" id="avisoVazio">Nenhum post ainda. Seja o primeiro!</p>');
        return;
    }

    posts.forEach(renderizarPost);
}

// ---------- Estratégias do socket.io ----------

// previousMessage: posts que já estavam no Firestore
socket.on('previousMessage', (posts) => {
    renderizarPosts(posts);
});

// receivedMessage: novo post publicado por qualquer usuário
socket.on('receivedMessage', (post) => {
    renderizarPost(post);
});

socket.on('erroPost', (mensagem) => {
    $('#posts').html($('<p class="aviso" id="avisoVazio"></p>').text(mensagem));
});

// ---------- Modal ----------
function abrirModal() {
    $('#erroForm').text('');
    $('#modal').addClass('aberto').attr('aria-hidden', 'false');
    $('#titulo').trigger('focus');
}

function fecharModal() {
    $('#modal').removeClass('aberto').attr('aria-hidden', 'true');
}

$('#btnAbrirModal').on('click', abrirModal);
$('#btnFecharModal').on('click', fecharModal);

$('#modal').on('click', (e) => {
    if (e.target.id === 'modal') fecharModal();
});

$(document).on('keydown', (e) => {
    if (e.key === 'Escape') fecharModal();
});

// ---------- Envio de posts pelo formulário ----------
$('#formPost').on('submit', (e) => {
    e.preventDefault();

    const titulo = $('#titulo').val().trim();
    const conteudo = $('#conteudo').val().trim();

    if (!titulo || !conteudo) {
        $('#erroForm').text('Preencha o título e o conteúdo do post.');
        return;
    }

    $('#erroForm').text('');
    $('#formPost button').prop('disabled', true);

    // sendMessage: envia o post; o servidor confirma se gravou no Firestore
    socket.emit('sendMessage', { titulo, conteudo }, (resposta) => {
        $('#formPost button').prop('disabled', false);

        if (!resposta.ok) {
            $('#erroForm').text(resposta.erro);
            return;
        }

        $('#formPost')[0].reset();
        fecharModal();
        $('html, body').animate({ scrollTop: $(document).height() }, 400);
    });
});
