// ================================
// Pizzaria do Zé — script.js
// ================================

// guarda os nomes dos produtos para mostrar no resumo
var nomesProdutos = {
  "Pizza Mussarela": 45.00,
  "Pizza Frango com Catupiry": 52.00,
  "Pizza Calabresa": 38.00,
  "Pizza Portuguesa": 58.00,
  "Pizza 4 Queijos": 42.00,
  "Refrigerante 2L": 12.00
};

// função chamada ao clicar no botão "+"
function aumentar(botao) {
  var spanQty = botao.previousElementSibling;
  var qtdAtual = parseInt(spanQty.textContent);
  spanQty.textContent = qtdAtual + 1;

  // marca o card como selecionado
  var card = botao.closest('.card-produto');
  card.classList.add('selecionado');

  atualizarPedido();
}

// função chamada ao clicar no botão "−"
function diminuir(botao) {
  var spanQty = botao.nextElementSibling;
  var qtdAtual = parseInt(spanQty.textContent);

  if (qtdAtual > 0) {
    spanQty.textContent = qtdAtual - 1;
  }

  // remove destaque se chegou a zero
  if (qtdAtual - 1 <= 0) {
    var card = botao.closest('.card-produto');
    card.classList.remove('selecionado');
  }

  atualizarPedido();
}

// atualiza o resumo do pedido e o total
function atualizarPedido() {
  var listaPedido = document.getElementById('lista-pedido');
  var msgVazio = document.getElementById('msg-vazio');
  var totalEl = document.getElementById('valor-total');

  var total = 0;
  var itens = [];

  // percorre todos os cards
  var cards = document.querySelectorAll('.card-produto');
  cards.forEach(function(card) {
    var qty = parseInt(card.querySelector('.qty').textContent);
    var preco = parseFloat(card.dataset.preco);
    var nome = card.querySelector('h3').textContent;

    if (qty > 0) {
      var subtotal = qty * preco;
      total += subtotal;
      itens.push({ nome: nome, qty: qty, subtotal: subtotal });
    }
  });

  // limpa a lista atual
  listaPedido.innerHTML = '';

  if (itens.length === 0) {
    // mostra mensagem de vazio
    listaPedido.innerHTML = '<p id="msg-vazio">Você ainda não adicionou nenhum item.</p>';
  } else {
    // cria uma linha pra cada item
    itens.forEach(function(item) {
      var linha = document.createElement('div');
      linha.className = 'item-pedido';
      linha.innerHTML = '<span>' + item.qty + 'x ' + item.nome + '</span>' +
                        '<span>R$ ' + item.subtotal.toFixed(2).replace('.', ',') + '</span>';
      listaPedido.appendChild(linha);
    });
  }

  // atualiza o total
  totalEl.textContent = 'R$ ' + total.toFixed(2).replace('.', ',');
}

// botão finalizar pedido
function finalizarPedido() {
  var cards = document.querySelectorAll('.card-produto');
  var temItem = false;

  cards.forEach(function(card) {
    if (parseInt(card.querySelector('.qty').textContent) > 0) {
      temItem = true;
    }
  });

  if (!temItem) {
    alert('Adicione pelo menos um item antes de finalizar! 🍕');
    return;
  }

  alert('Pedido recebido! Em breve entraremos em contato para confirmar. 😄');
}
