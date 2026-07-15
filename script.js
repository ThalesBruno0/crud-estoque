const formProduto = document.getElementById('form-produto');
const nomeProdutoInput = document.getElementById('nome-produto');
const qtdeProdutoInput = document.getElementById('qtde-produto');
const precoProdutoInput = document.getElementById('preco-produto');
const inventarioList = document.getElementById('inventario-list');

let produtos = JSON.parse(localStorage.getItem('inventario_produtos')) || [];

function mostraTabela(){
    inventarioList.innerHTML = ''

    if (produtos.length === 0){
        inventarioList.innerHTML = `<tr>
                                        <td colspan="5" class="empty-msg">Nenhum produto cadastrado ainda.</td>
                                    </tr>`;
        return;
    }

    produtos.forEach((produto, index) => {
        const totalValue = produto.qtde * produto.preco;

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.qtde}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td>R$ ${totalValue.toFixed(2)}</td>
            <td>
                <button class="btn-delete" onclick="deleteProduct(${index})" style="background-color: var(--danger-color); padding: 5px 10px; font-size: 0.85rem;">Excluir</button>
            </td>
        `;

        // Coloca a linha nova dentro do corpo da tabela
        inventarioList.appendChild(row);
    });
}

function addProduto(event) {

    event.preventDefault();

    const novoProduto = {
        nome: nomeProdutoInput.value,
        qtde: parseInt(qtdeProdutoInput.value), 
        preco: parseFloat(precoProdutoInput.value) 
    };

    produtos.push(novoProduto);

    localStorage.setItem('inventario_produtos', JSON.stringify(produtos));

    formProduto.reset();

    mostraTabela();
}

function deletaProduto(index) {

    produtos.splice(index, 1);

    localStorage.setItem('inventario_produtos', JSON.stringify(produtos));

    mostraTabela();
}

formProduto.addEventListener('submit', addProduto);

mostraTabela();