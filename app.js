// Lista de Amigos
let amigos = [];
let lista = document.getElementById('listaAmigos');
let sorteioRealizado = false;
let amigosSorteados = []; // Array para guardar os amigos já sorteados
let resultado = document.getElementById('resultado'); // Elemento para exibir o resultado

// Função genérica para limpar input e dar alerta
function alertaLimpaInput(mensagem) {
    alert(mensagem);
    document.querySelector('input').value = '';
}

// Adicionar amigos
function adicionarAmigo() {
    if (!sorteioRealizado) {
        let nome = document.querySelector('input').value;
        if (amigos.includes(nome)) {
            alertaLimpaInput("Este nome já foi adicionado!");
        } else if (nome == '') {
            alertaLimpaInput("Por favor, insira um nome válido!");
        } else {
            amigos.push(nome);
            limparCampo();
        }
        listaDeNomes();
    } else {
        alertaLimpaInput('O sorteio já foi realizado. Reinicie o sorteio.');
    }
}

// Limpar o campo do nome
function limparCampo() {
    document.querySelector('input').value = '';
}

// Lista dos Nomes
function listaDeNomes() {
    lista.innerHTML = '';
    amigos.forEach((amigo, index) => {
        let itemLista = document.createElement('li');
        itemLista.textContent = amigo;

        let botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'X';
        botaoExcluir.classList.add('botao-excluir');
        botaoExcluir.onclick = () => removerAmigo(index);

        itemLista.appendChild(botaoExcluir);
        lista.appendChild(itemLista);
    });
}

function listaDeNomesAposOSorteio() {
    let texto = document.querySelector('ul');
    texto.innerHTML = `Os Amigos que estão participando do sorteio são: ${ amigos}`;
}

// Remover amigo
function removerAmigo(index) {
    amigos.splice(index, 1);
    listaDeNomes();
}

// Sortear um amigo secreto
function sortearAmigo() {
    if (!sorteioRealizado) {
        if (amigos.length === 0) {
            alert('Adicione um amigo para realizar o sorteio!');
        } else if (amigos.length === amigosSorteados.length) { // Todos os amigos já foram sorteados
            alert('Todos os amigos já foram sorteados!');
            sorteioRealizado = true; // Impede novos sorteios até reiniciar
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            let candidatos = amigos.filter(amigo => !amigosSorteados.includes(amigo)); // Filtra amigos não sorteados
            let amigoSorteado = candidatos[Math.floor(Math.random() * candidatos.length)];
            listaDeNomesAposOSorteio();

            resultado.innerHTML = `O amigo secreto é: ${amigoSorteado}`;
            amigosSorteados.push(amigoSorteado); // Adiciona o amigo sorteado à lista

            if (amigosSorteados.length === amigos.length) { // Verifica se todos já foram sorteados
                sorteioRealizado = true;
                document.getElementById('reiniciar').removeAttribute('disabled');
            }

            limparCampo(); // Limpa o input após o sorteio
        }
    } else {
        alertaLimpaInput('O sorteio já foi realizado. Reinicie o sorteio.');
    }
    
}
document.getElementById('amigo').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') { // Verifica se a tecla pressionada foi Enter
      adicionarAmigo(); // Adiciona o amigo ao pressionar Enter
    }
  });

// Limpar a lista (modificado para resetar amigosSorteados)
function limparLista() {
    amigos = [];
    amigosSorteados = []; // Reseta a lista de amigos sorteados
    listaDeNomes();
}

// Reiniciar sorteio (mantido igual)
function reiniciarJogo() {
    sorteioRealizado = false;
    resultado.innerHTML = '';
    document.getElementById('reiniciar').setAttribute('disabled', true);
    limparLista(); // Garante a limpeza da lista ao reiniciar o jogo
}
