// vars de altura e largura da tela
var altura = 0;
var largura = 0;

// var de vidas do jogador
var vidas = 1;
// var do tempo de vitória do jogo
var tempo = 10;

// var do tempo da criação dos mosquitos
var criaMosquitoTempo = 1500;
// var do nível. | o atributo search busca apenas o que vem escrito após o ponto de interrogação
var nivel = window.location.search;
nivel = nivel.replace('?', '');
// decisão para ver qual nível foi selecionado, e em qual tempo os mosquitos serão criados de acordo com o nível.
if (nivel === 'normal') {
    criaMosquitoTempo = 1500;
} else if (nivel === 'dificil') {
    criaMosquitoTempo = 1000;
} else if (nivel === 'mdificil') {
    criaMosquitoTempo = 750;
}

// função que delimita o tamanho da tela para o usuário jogar
function ajustaTamanhoPalcoJogo() {
    // vars de altura e largura da tela
    altura = window.innerHeight;
    largura = window.innerWidth;
    console.log(largura, altura);
}

ajustaTamanhoPalcoJogo();

// var cronometro, a cada segundo a var tempo vai perdendo 1, a cada um segundo que se passa. e quando o tempo for menor que 0, o jogador é direcionado para a página de vitória.
var cronometro = setInterval(function() {
    tempo -= 1
    if (tempo < 0) {
        window.location.href = 'vitoria.html';
        // break da contagem do cronometro
        clearInterval(cronometro);
        // break da criação de mosquitos
        clearInterval(criaMosquito);
    } else {
        document.getElementById('cronometro').innerHTML = tempo;
    }
}, 1000);

// Função que trás a posição randomica em que os mosquistos vão aparecer
function posicaoRandomica() {
    //remover o mosquito caso exista
    // para verificar se o elemento existe na página basta passar ele em um if, o JS irá interpretar como true se existir e null se não existir.
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove();
        // se a var vidas passar de 3, significa que o jogador perdeu todas as vidas, e o que dá game over.
        if (vidas === 3) {
            window.location.href = 'fim_de_jogo.html';
        } else {
            //toda vez que o usuário não clicar no mosquito, ele será removido automaticamente e entrará nessa condição. Essa remoção resultará na perda de vidas, toda a vez que entrarmos nessa condição, a var vidas vai receber mais, e vai puxar os ids de forma automática, somando na var vidas mais 1. 
            document.getElementById('v' + vidas).src = 'imagens/coracao_vazio.png';
            vidas++;
        }
    }
    // var dos eixos x(largura) e y(altura), e recebem a fução Math.random() para gerar numeros randomicos para a posição das moscas.
    //a multiplicação entre as variaveis irão fornecer posições diferentes entre largura e altura. O decremento vai ser utilizado apenas para a imagem não passar do limite quando for posicionada em um número próximo do limite.
    var posicaoX = Math.floor(Math.random() * largura) - 90;
    var posicaoY = Math.floor(Math.random() * altura) - 90;

    // prevenir que o valor do eixoX e eixoY seja menor que 0 com operador ternário
    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    console.log(posicaoX, posicaoY);
    // criar o elemento HTML
    // createElement -> cria um elemento HTML
    var mosquito = document.createElement('img');
    // atribuição de imagem e classe para o elemento html.
    mosquito.src = 'imagens/mosca.png';
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
    // uso da propriedade style, left e top, para concatenar o eixoX e eixoY em pixels e position absolute
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';
    mosquito.style.position = 'absolute';
    mosquito.id = 'mosquito';
    // função que ao clicar no mosquito ele desaparece
    mosquito.onclick = function() {
        // this -> faz referência ao próprio elemento html, no exemplo o elemento mosquito
        this.remove();
    }

    // appendChild -> adiciona o elemento na parte que desejar do html, no exemplo no Body que é o elemento pai.
    document.body.appendChild(mosquito);
}

// Função que altera o tamanho aleatório do mosquito, essa função está sendo chamada na função de posição aleatória
function tamanhoAleatorio() {
    // quando multiplicado por 3, o resultado será entre 0 e 2
    var tamanho = Math.floor(Math.random() * 3);
    console.log(tamanho);
    // verifica qual o valor que a var classe recebe, se receber entre 0 e 2, irá dar tamanhos diferentes para os mosquitos
    switch (tamanho) {
        case 0:
            return 'mosquito1';
        case 1:
            return 'mosquito2';
        case 2:
            return 'mosquito3';

    }
}
// Função que altera o lado do mosquito, essa função está sendo chamada na função de posição aleatória
function ladoAleatorio() {
    // quando multiplicado por 2, o resultado será entre 0 e 1
    var lado = Math.floor(Math.random() * 2);
    // verifica qual o valor que a var classe recebe, se receber entre 0 e 1, irá dar lados diferentes para os mosquitos
    switch (lado) {
        case 0:
            return 'ladoA';
        case 1:
            return 'ladoB';
    }
}

function iniciarJogo() {
    var nivel = document.getElementById('nivel').value;

    if (nivel === '') {
        alert('Selecione um nível: Normal, Difícil ou Muito Difícil');
        return false;
    }
    // ?: no parametro de caminho usamos o ? para separar a página que será encaminhada, dos parametros. Exemplo: app.html?normal
    window.location.href = 'app.html?' + nivel;
}