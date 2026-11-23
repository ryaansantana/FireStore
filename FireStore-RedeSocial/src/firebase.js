// =============================================================
//  Conexão com o banco de dados FireStore DataBase
// =============================================================
const { initializeApp } = require('firebase/app');
const {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    orderBy
} = require('firebase/firestore');

// Configuração do app web do Firebase (projeto app-bd3-ryan)
const firebaseConfig = {
    apiKey: 'AIzaSyAR_jkrfr_pc8Oo1bVLe-ofPdcKgstEDSU',
    authDomain: 'app-bd3-ryan.firebaseapp.com',
    projectId: 'app-bd3-ryan',
    storageBucket: 'app-bd3-ryan.firebasestorage.app',
    messagingSenderId: '783096329824',
    appId: '1:783096329824:web:18047d72138eb3f2ee3505'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Coleção onde os posts ficam guardados no Firestore
const postsRef = collection(db, 'posts');

// Busca todos os posts já realizados (do mais antigo para o mais novo)
async function buscarPosts() {
    const consulta = query(postsRef, orderBy('criadoEm', 'asc'));
    const snapshot = await getDocs(consulta);

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Grava um novo post e devolve o post com o id gerado pelo Firestore
async function salvarPost(post) {
    const docRef = await addDoc(postsRef, post);
    return { id: docRef.id, ...post };
}

module.exports = { buscarPosts, salvarPost };